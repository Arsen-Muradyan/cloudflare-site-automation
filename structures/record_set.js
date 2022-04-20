const DnsRecord = require("./dns_record");

class RecordSet {
    _records = []
    _domain = "";
    constructor(domain) {
        this._domain = domain;
    }

    static createSimpleRecordSet(domain) {
        const record = new RecordSet(domain)
        record.generateSampleRecord();
        return record;
    }
    addRecord(dnsRecord) {
        this._records.push(dnsRecord);
    }
    generateSampleRecord() {
        const dnsRecord1 = new DnsRecord();
        dnsRecord1.type = "A";
        dnsRecord1.name = this._domain;
        dnsRecord1.content = "3.127.1.1";
        this.addRecord(dnsRecord1)
    }
    get records() {
        return this._records;
    }
}

module.exports = RecordSet;