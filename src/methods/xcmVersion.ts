import { ApiPromise } from "@polkadot/api";
import { AddressOrPair } from "src/interfaces/generics";

export const forceDefaultXcmVersion = async (
  xcmVersion: number | string,
  api: ApiPromise,
  account: AddressOrPair
) => {
  if (!api?.tx?.sudo) throw new Error("No sudo tx method found");

  if (!api?.tx?.xcmPallet?.forceDefaultXcmVersion)
    throw new Error("No forceDefaultXcmVersion method found");

  return api.tx.sudo
    .sudo(api.tx.xcmPallet.forceDefaultXcmVersion(xcmVersion))
    .signAndSend(account);
};
