import { Keyring } from "@polkadot/keyring";
import { Provider } from "../provider";
import { options } from "yargs";
import { cryptoWaitReady } from "@polkadot/util-crypto";

const args = options({
  rpc: { type: "string", demandOption: true },
  destination: { type: "string", demandOption: true, alias: "dest" },
  "destination-value": { type: "string", demandOption: true, alias: "destV" },
  beneficiary: { type: "string", demandOption: true, alias: "ben" },
  "beneficiary-value": { type: "string", demandOption: true, alias: "benV" },
  amount: { type: "string", demandOption: true, alias: "a" },
}).argv as any;

const main = async () => {
  const rpc = args["rpc"];
  const destination = args["destination"];
  const destinationValue = args["destination-value"];
  const beneficiary = args["beneficiary"];
  const beneficiaryValue = args["beneficiary-value"];
  const amount = args["amount"];

  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromUri("//Alice");

  const provider = new Provider(rpc, sender);

  const res = await provider.teleportAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });

  console.log(res?.toHuman());
};

main().then(() => process.exit(1));

/**
 * 
pnpm ts-node src/examples/limitedTeleportAssets-to-para.ts \
--rpc ws://127.0.0.1:37345 \
--dest Parachain \
--destV 2000 \
--ben AccountId32 \
--benV 0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48 \
--a 1000000000000000
 */
