"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = void 0;
const request_1 = require("./request");
const vars_1 = __importDefault(require("./vars"));
exports.tokens = {
    createToken: (req, extraHttpOptions) => request_1.post(`${vars_1.default.basePaths.tokens}`, req, Object.assign(Object.assign({}, extraHttpOptions), { useSecureEndpoint: true })),
    getTokens: (req, extraHttpOptions) => request_1.get(`${vars_1.default.basePaths.tokens}`, req, extraHttpOptions),
    getToken: (req, extraHttpOptions) => request_1.get(`${vars_1.default.basePaths.tokens}/${req.id}`, undefined, extraHttpOptions),
    updateToken: (req, extraHttpOptions) => request_1.patch(`${vars_1.default.basePaths.tokens}/${req.id}`, req, extraHttpOptions),
};
//# sourceMappingURL=tokens.js.map