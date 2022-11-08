import { ApiPromise } from "@polkadot/api";
import { AddressOrPair } from "src/interfaces/generics";
import { XcmVersionesMultiLocation } from "../interfaces/generics";

export const reserveTransferAsset = async (
  parachainIdDestination: string,
  accountIdDestination: string,
  assetAmount: number,
  api: ApiPromise,
  account: AddressOrPair,
  feeAssetItem?: number
) => {
  // TODO: conditional version
  const dest: XcmVersionesMultiLocation = {
    V1: {
      parents: 0,
      interior: {
        X1: {
          Parachain: Number(parachainIdDestination),
        },
      },
    },
  };

  const beneficiary: XcmVersionesMultiLocation = {
    V1: {
      parents: 0,
      interior: {
        X1: {
          AccountId32: {
            network: "Any",
            id: accountIdDestination,
          },
        },
      },
    },
  };

  const assets = {
    V1: [
      {
        id: {
          Concrete: {
            parents: 0,
            interior: "Here",
          },
        },
        fun: {
          Fungible: Number(assetAmount),
        },
      },
    ],
  };

  return await api.tx.xcmPallet
    ?.reserveTransferAssets(dest, beneficiary, assets, feeAssetItem || 0)
    .signAndSend(account);
};
