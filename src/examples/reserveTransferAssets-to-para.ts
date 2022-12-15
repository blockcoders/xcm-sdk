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

  const res = await provider.reserveTransferAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });

  console.log(res?.toHuman());
};

main();

/**
 * 
pnpm ts-node src/examples/txassets.ts \
--rpc ws://127.0.0.1:9944 \
--dest Parachain \
--destV 2000 \
--ben AccountId32 \
--benV 5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy \
--a 100000000000000
 */
