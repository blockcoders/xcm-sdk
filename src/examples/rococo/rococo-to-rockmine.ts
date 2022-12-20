import { Keyring } from "@polkadot/keyring";
import { Provider } from "../../provider";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { rococoExampleUtils } from "./rococo-examples-utilts";

const main = async () => {
  const rpc = rococoExampleUtils.rococoRpc;
  const destination = "Parachain";
  const destinationValue = rococoExampleUtils.rockMineParachainId;
  const beneficiary = "AccountId32";
  const beneficiaryValue = rococoExampleUtils.rockmineDestinationAccount;
  const amount = 500000000000;

  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromMnemonic(rococoExampleUtils.senderMnemonic);

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
pnpm ts-node src/examples/rococo/rococo-to-rockmine.ts
 */
