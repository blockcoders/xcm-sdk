import { Keyring } from "@polkadot/keyring";
import { Provider } from "../../provider";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { localNetworkUtils } from "./local-network-utils";

const main = async () => {
  const rpc = localNetworkUtils.relayRpc;
  const destination = "Parachain";
  const destinationValue = localNetworkUtils.parachain2ChainId;
  const beneficiary = "AccountId32";
  const beneficiaryValue = localNetworkUtils.parachain2DestinationAccount;
  const amount = 5000000000000000;

  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromUri("//Alice");

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
pnpm ts-node src/examples/local-network/limitedTeleportAssets-to-para2000.ts 
 */
