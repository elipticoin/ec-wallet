const request = require("request-promise");
const cbor = require("cbor");
import {
  Command,
  command,
  param,
} from 'clime';
import {
  BASE_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  PUBLIC_KEY,
  ELIPITCOIN_SEED_EDGE_SERVERS,

} from "../constants";
import Client from "../ellipticoin/client";
import {toBytesInt32} from "../utils";
const ed25519 = require('ed25519');

@command({
  description: 'Send Elipticoins',
})
export default class extends Command {
  execute(
    @param({
      description: 'the address you\'d like to send the tokens to',
      required: true,
    })
    receiver: string,
    @param({
      description: 'the amount of tokens you\'d like to send',
      required: true,
    })
    amount: number,
  ) {
    const client = Client.fromConfig();

    return client.resolveAddress(receiver)
      .then((receiverBuffer) => {
        return client.call(
          "transfer",
          [receiverBuffer, amount * 10000]
        ).then(() => {
          return `Transferred ${amount} to ${receiver}`
        });
      })
  }
}
