"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const cbor = require("cbor");
const clime_1 = require("clime");
const client_1 = require("../elipticoin/client");
const ed25519 = require('ed25519');
let default_1 = class default_1 extends clime_1.Command {
    execute(amount, receiver) {
        // const receiverAddress = new Buffer(receiver, 'base64');
        // const rpc_call = cbor.encode({
        //   method: "transfer",
        //   params: [
        //     receiverAddress,
        //     amount,
        //   ]
        // });
        //
        // const nonce = toBytesInt32(0);
        // const message = Buffer.concat([
        //   PUBLIC_KEY,
        //   nonce,
        //   BASE_CONTRACT_ADDRESS,
        //   rpc_call,
        // ]);
        //
        // const body = Buffer.concat([
        //   ed25519.Sign(message, PRIVATE_KEY),
        //   message
        // ]);
        //
        // return request({
        //   url: ELIPITCOIN_EDGE_SERVER,
        //   method: "POST",
        //   encoding: null,
        //   body,
        // })
        const client = client_1.default.fromConfig();
        return client.call({
            method: "transfer",
            params: [
                new Buffer(receiver, 'base64'),
                amount,
            ]
        }).then(() => {
            return `Transferred ${amount} to ${receiver}`;
        });
    }
};
__decorate([
    __param(0, clime_1.param({
        description: 'the amount of tokens you\'d like to send',
        required: true,
    })),
    __param(1, clime_1.param({
        description: 'the address you\'d like to send the tokens to',
        required: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], default_1.prototype, "execute", null);
default_1 = __decorate([
    clime_1.command({
        description: 'Send Elipticoins',
    })
], default_1);
exports.default = default_1;
