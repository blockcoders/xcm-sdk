import { ApiPromise } from "@polkadot/api";
import { AddressOrPair } from "src/interfaces/generics";
import { XcmVersionesMultiLocation } from "../interfaces/generics";

export const reserveTransferAsset = async (
  parachainIdDestination: string,
  accountIdDestination: string,
  assetAmount: number,
  api: ApiPromise,
  account: AddressOrPair,
  weightLimit?: number,
  feeAssetItem?: number
) => {
  // TODO: conditional version
  const _dest: XcmVersionesMultiLocation = {
    V1: {
      parents: 0,
      interior: {
        X1: {
          Parachain: Number(parachainIdDestination),
        },
      },
    },
  };

  const _beneficiary: XcmVersionesMultiLocation = {
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

  const _assets = {
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

  return api.tx.xcmPallet
    ?.reserveTransferAssets(_dest, _beneficiary, _assets, feeAssetItem || 0)
    .signAndSend(account);
};
