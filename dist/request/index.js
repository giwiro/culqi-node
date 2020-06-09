"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._httpResponseCallback = exports.request = exports.delete_ = exports.patch = exports.post = exports.get = void 0;
const https_1 = __importDefault(require("https"));
const querystring_1 = __importDefault(require("querystring"));
const vars_1 = __importDefault(require("../vars"));
function _httpResponseCallback(res, resolve, reject) {
    let buffer = '';
    const statusCode = res.statusCode;
    res.on('data', (chunk) => (buffer += chunk));
    res.on('end', () => {
        let r;
        if (buffer && buffer.length) {
            try {
                r = JSON.parse(buffer);
            }
            catch (e) {
                return reject(new Error(`Response was not a valid JSON. Response: ${buffer}`));
            }
        }
        if (typeof statusCode !== 'number')
            return reject(new Error('Status code is undefined'));
        if (Math.round(statusCode / 100) !== 2)
            return reject(r);
        return resolve(r);
    });
}
exports._httpResponseCallback = _httpResponseCallback;
function request(path, options) {
    const body = options && options.body ? JSON.stringify(options.body) : '';
    const httpProvider = options && options._httpProvider ? options._httpProvider : https_1.default;
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
        'User-Agent': 'culqi-node',
        Authorization: `Bearer ${vars_1.default.privateKey}`,
    };
    const opts = {
        host: vars_1.default.baseEndpoint.domain,
        path: `${vars_1.default.baseEndpoint.basePath}${path}`,
        headers: Object.assign({}, defaultHeaders),
        method: 'GET',
    };
    if (options) {
        if (options.useSecureEndpoint) {
            if (!vars_1.default.publicKey)
                throw new Error("Provide 'publicKey' property");
            opts.host = vars_1.default.baseSecureEndpoint.domain;
            opts.path = `${vars_1.default.baseSecureEndpoint.basePath}${path}`;
            opts.headers = Object.assign(Object.assign({}, opts.headers), { Authorization: `Bearer ${vars_1.default.publicKey}` });
        }
        if (options.headers)
            opts.headers = Object.assign(Object.assign({}, opts.headers), options.headers);
        if (options.method)
            opts.method = options.method;
        if (options.queryParams && Object.keys(options.queryParams).length > 0)
            opts.path = `${opts.path}?${querystring_1.default.stringify(options.queryParams)}`;
    }
    return new Promise((resolve, reject) => {
        const req = httpProvider.request(opts, (res) => {
            _httpResponseCallback(res, resolve, reject);
        });
        if (body)
            req.write(body);
        req.end();
    });
}
exports.request = request;
function get(path, queryParams, options) {
    return request(path, Object.assign(Object.assign({}, options), { queryParams, method: 'GET' }));
}
exports.get = get;
function post(path, body, options) {
    return request(path, Object.assign(Object.assign({}, options), { body, method: 'POST' }));
}
exports.post = post;
function delete_(path, options) {
    return request(path, Object.assign(Object.assign({}, options), { method: 'DELETE' }));
}
exports.delete_ = delete_;
function patch(path, body, options) {
    return request(path, Object.assign(Object.assign({}, options), { body, method: 'PATCH' }));
}
exports.patch = patch;
//# sourceMappingURL=index.js.map