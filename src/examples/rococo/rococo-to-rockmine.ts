import { Keyring } from "@polkadot/keyring";
import { Provider } from "../../provider";
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
  const sender = keyring.addFromMnemonic("<your mnemonic seed>");

  console.log(sender.address);

  const provider = new Provider(rpc, sender);

  const res = await provider.limitedTeleportAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });

  console.log(res);
};

main().then(() => process.exit(1));

/**
 * 
pnpm ts-node src/examples/rococo/rococo-to-rockmine.ts \
--rpc wss://rococo-rpc.polkadot.io \
--dest Parachain \
--destV 1000 \
--ben AccountId32 \
--benV H25ZWNzxr7WXnzaxvCiWsYDeZDXFtNCCdHJLsuEKqz28uXL \
--a 500000000000
 */
