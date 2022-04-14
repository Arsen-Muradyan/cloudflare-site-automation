class DnsRecord {
    _type = "";
    _name = "";
    _content = "";
    _ttl = 3600;
    _priority = 10;
    _proxied = false;
    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    get ttl() {
        return this._ttl;
    }

    set ttl(value) {
        this._ttl = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get proxied() {
        return this._proxied;
    }

    set proxied(value) {
        this._proxied = value;
    }
    getObject() {
        return {
            type: this._type,
            name: this._name,
            content: this._content,
            ttl: this._ttl,
            priority: this._priority,
            proxied: this._proxied
        }
    }
}
module.exports = DnsRecord;