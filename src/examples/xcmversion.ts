import { Keyring } from "@polkadot/keyring";
import { options } from "yargs";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { Provider } from "../../src/provider";

const args = options({
  rpc: { type: "string", demandOption: true },
  "xcm-version": { type: "string", demandOption: true, alias: "xv" },
}).argv as any;

const main = async () => {
  const rpc = args["rpc"];
  const xcmVersion = Number(args["xcm-version"]);

  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromUri("//Alice");

  const provider = new Provider(rpc, sender);

  const res = await provider.forceDefaultXcmVersion(xcmVersion);

  console.log(res?.toHuman());
};

main();

/**
 * 
pnpm ts-node src/examples/xcmversion.ts \
--rpc ws://127.0.0.1:9944 \
--xv 10 

 */
