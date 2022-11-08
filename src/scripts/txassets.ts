import { reserveTransferAsset } from "src/methods/reserveTransferAsset";

const { WsProvider, ApiPromise } = require("@polkadot/api");
const { Keyring } = require("@polkadot/keyring");
const { options } = require("yargs");

const args = options({
  "relay-ws-provider": { type: "string", demandOption: true, alias: "wr" },
  "para-id": { type: "string", demandOption: true, alias: "pid" },
  "account-dest": { type: "string", demandOption: true, alias: "accd" },
  fungible: { type: "string", demandOption: true, alias: "f" },
  "fee-asset-item": { type: "string", alias: "fai" },
}).argv;

const main = async () => {
  const api = await ApiPromise.create({
    provider: new WsProvider(args["relay-ws-provider"]),
  });
  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromUri("//Alice");

  reserveTransferAsset(
    args["para-id"],
    args["account-dest"],
    args["fungible"],
    api,
    sender,
    args["fee-asset-item"]
  );
};

main();
