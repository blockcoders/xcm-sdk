import { Keyring } from "@polkadot/keyring";
import { Provider } from "../../src/provider";
import { options } from "yargs";
import { cryptoWaitReady } from "@polkadot/util-crypto";

const args = options({
  "relay-ws-provider": { type: "string", demandOption: true, alias: "wr" },
  // "para-id": { type: "string", demandOption: true, alias: "pid" },
  // "account-dest": { type: "string", demandOption: true, alias: "accd" },
  // fungible: { type: "string", demandOption: true, alias: "f" },
  // "fee-asset-item": { type: "string", alias: "fai" },
}).argv as any;

const main = async () => {
  const rpc = args["relay-ws-provider"];

  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromUri("//Alice");

  const provider = new Provider(rpc, sender);

  const res = await provider.reserveTransferAsset({
    destination: "Parachain",
    destinationValue: "2000",
    beneficiary: "AccountId32",
    beneficiaryValue: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    amount: 10000000000000,
  });

  console.log(res);
};

main();

// polkadot encoded call
// 0x630201000100411f01000101008eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a480104000000000b00407a10f35a00000000
