import { forceDefaultXcmVersion } from "../methods/xcmVersion";
const { WsProvider, ApiPromise } = require("@polkadot/api");
const { Keyring } = require("@polkadot/keyring");
const { options } = require("yargs");

const args = options({
  "ws-provider": { type: "string", demandOption: true, alias: "ws" },
  "xcm-version": { type: "string", demandOption: true, alias: "xv" },
}).argv;

const main = async () => {
  const api = await ApiPromise.create({
    provider: new WsProvider(args["ws-provider"]),
  });
  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromUri("//Alice");

  const xcmVersion = Number(args["xcm-version"]);

  console.log(api.tx);

  await forceDefaultXcmVersion(xcmVersion, api, sender);
};

main();
