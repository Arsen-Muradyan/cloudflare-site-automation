const axios = require("axios");
const RecordSet = require("../entity/record_set");
require("dotenv").config();
const ACCOUNT_ID = process.env.ACCOUNT_ID;
const CF_API_KEY = process.env.CF_API_KEY;
const CF_API_EMAIL = process.env.CF_API_EMAIL;
const CLOUDFLARE_API_URL = process.env.CLOUDFLARE_API_URL;

// Credentials header and zone request body
function getRequestDataAndConfig(domain) {
    return {
        data: {
            account: {
                id: ACCOUNT_ID,
            },
            name: domain,
            jump_start: true,
        },
        config: {
            headers: {
                "X-Auth-Key": CF_API_KEY,
                "X-Auth-Email": CF_API_EMAIL,
                "Content-Type": "application/json",
            },
        },
    };
}

const sendBadRequest = (reply) => {
    return (err) => {
        console.log(err);
        reply.send({
            status: 400,
            message: "Bad request",
        });
    };
};

module.exports = (api, opts, done) => {
    api.post("/", async (req, reply) => {
        const { domain } = req.body;
        const reqData = getRequestDataAndConfig(domain);

        // -- region request for create zone
        const zoneResponse = await axios
            .post(`${CLOUDFLARE_API_URL}/zones`, reqData.data, reqData.config)
            .catch(sendBadRequest(reply));
        // endregion

        const zoneId = zoneResponse.data["result"]["id"];
        const recordSet = RecordSet.createSimpleRecordSet(domain);
        const records = recordSet.records;

        //  -- region request for create dns records
        const dnsRecordRequests = records.map((record) =>
            axios.post(
                `${CLOUDFLARE_API_URL}/zones/${zoneId}/dns_records`,
                record.getObject(),
                reqData.config
            )
        );
        const dnsRecordResponses = await Promise.all(dnsRecordRequests).catch(sendBadRequest(reply));
        dnsRecordResponses.forEach((response) => {
            if (response.status !== 200) {
                sendBadRequest(reply)(response.data["result"]["errors"]);
            }
        })
        // endregion

        const nameServers = zoneResponse.data["result"]["name_servers"];
        reply.send({
            name_servers: nameServers,
        });
    });
    done();
};
