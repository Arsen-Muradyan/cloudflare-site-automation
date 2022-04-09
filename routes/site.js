const axios = require("axios");
require("dotenv").config()
const ACCOUNT_ID = process.env.ACCOUNT_ID;
const CF_API_KEY = process.env.CF_API_KEY;
const CF_API_EMAIL = process.env.CF_API_EMAIL;

function getRequestDataAndConfig(domain) {
    return {
        data: {
            account: {
                id: ACCOUNT_ID,
            }, name: domain, jump_start: true
        }, config: {
            headers: {
                "X-Auth-Key": CF_API_KEY,
                "X-Auth-Email": CF_API_EMAIL,
                "Content-Type": "application/json"
            }
        }
    }
}

module.exports = (api, opts, done) => {
    api.post("/", async (req, reply) => {
        const {domain} = req.body;
        const reqData = getRequestDataAndConfig(domain);

        const response = await axios.post(
            "https://api.cloudflare.com/client/v4/zones",
            reqData.data, reqData.config
        ).catch(err => {
                console.log(err);
                reply.send({
                    status: 400, message: "Bad request"
                })
            })
        const nameServers = response.data['result']['name_servers']
        reply.send({
            "name_servers": nameServers
        })
    })
    done();
}