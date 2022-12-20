import { Keyring } from "@polkadot/keyring";
import { Provider } from "../../provider";
import { cryptoWaitReady } from "@polkadot/util-crypto";

const main = async () => {
  const rpc = "wss://rococo-rpc.polkadot.io";
  const destination = "Parachain";
  const destinationValue = "1000"; //parachain id (Rockmine)
  const beneficiary = "AccountId32";
  const beneficiaryValue = "H25ZWNzxr7WXnzaxvCiWsYDeZDXFtNCCdHJLsuEKqz28uXL";
  const amount = 500000000000;

  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromMnemonic("<your mnemonic seed>");

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