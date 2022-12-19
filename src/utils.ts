import { u8aToHex } from "@polkadot/util";
import { decodeAddress } from "@polkadot/util-crypto";
import { ApiPromise } from "@polkadot/api";
import {
  MultiLocationTypes,
  XcmVersionesMultiLocation,
} from "./interfaces/generics";

export const makeXcmVersionesMultiLocation = (
  target: MultiLocationTypes,
  value: string,
  parents: number = 0
): XcmVersionesMultiLocation => {
  let val: XcmVersionesMultiLocation;

  let interior: any = "Here";

  if (target === "Parachain") {
    interior = {
      X1: {
        Parachain: Number(value),
      },
    };
  }

  if (target === "AccountId32") {
    const isHex = value.startsWith("0x");

    const accountId = isHex ? value : u8aToHex(decodeAddress(value));

    interior = {
      X1: {
        [target]: {
          network: "Any",
          id: accountId,
        },
      },
    };
  }

  val = {
    V1: {
      parents,
      interior,
    },
  };

  return val;
};

export const makeAsssetMultiAsset = ({
  assetId,
  palletInstance = 50,
  amount,
}: any) => {
  const V1 = [
    {
      id: {
        Concrete: {
          parents: 0,
          interior: !assetId
            ? "Here"
            : {
                X2: [
                  {
                    PalletInstance: palletInstance,
                  },
                  {
                    GeneralIndex: assetId,
                  },
                ],
              },
        },
      },
      fun: {
        Fungible: Number(amount),
      },
    },
  ];
  return {
    V1,
  };
};

export const formatExtrinsicResponse = ({
  api,
  res,
  rej,
  status,
  txHash,
  dispatchError,
  dispatchInfo,
}: any) => {
  if (status.isInBlock || status.isFinalized) {
    if (dispatchError) {
      if (dispatchError.isModule) {
        const decoded = api.registry.findMetaError(dispatchError.asModule);
        const { docs, name, section } = decoded;

        rej(`${section}.${name}: ${docs.join(" ")}`);
      } else {
        rej(dispatchError.toString());
      }
    } else if (dispatchInfo) {
      res(txHash.toString());
    }
  }
};

export const getPallet = (api: ApiPromise) => {
  return api.tx.xcmPallet ? "xcmPallet" : "polkadotXcm";
};
