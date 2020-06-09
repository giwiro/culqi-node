"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const vars_1 = __importDefault(require("./vars"));
const tokens_1 = require("./tokens");
module.exports = class Culqi {
    constructor(options = {}) {
        this.tokens = tokens_1.tokens;
        if (!options.privateKey)
            throw new Error("Provide 'privateKey' property");
        if (options.pciCompliant && !options.publicKey)
            throw new Error("Provide 'publicKey' property");
        if (!options.pciCompliant && options.publicKey)
            throw new Error("Provide 'pciCompliant' options as true. " +
                'It means you acknowledge that you are PCI-compliant in order to execute certain operations.');
        vars_1.default.privateKey = options.privateKey;
        if (options.publicKey)
            vars_1.default.publicKey = options.publicKey;
    }
};
//# sourceMappingURL=index.js.map