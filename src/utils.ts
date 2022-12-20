import { u8aToHex } from "@polkadot/util";
import { decodeAddress } from "@polkadot/util-crypto";
import { ApiPromise } from "@polkadot/api";
import {
  MakeXcmVersionedMultiAssetsProps,
  MakeXcmVersionedMultiLocationProps,
} from "./interfaces/utils-interfaces";
import { XcmVersionedMultiLocation } from "./interfaces/generics";

export const makeXcmVersionedMultiLocation = ({
  parents,
  target,
  value,
}: MakeXcmVersionedMultiLocationProps): XcmVersionedMultiLocation => {
  let xcmVersionedMultiLocation: XcmVersionedMultiLocation;

  let interior: any = "Here";

  if (target === "Parachain") {
    interior = {
      X1: {
        Parachain: Number(value),
      },
    };
  }

  if (target === "AccountId32") {
    const account = String(value);
    const isHex = account?.startsWith("0x");

    const accountId = isHex ? value : u8aToHex(decodeAddress(account));

    interior = {
      X1: {
        AccountId32: {
          network: "Any",
          id: accountId,
        },
      },
    };
  }

  xcmVersionedMultiLocation = {
    V1: {
      parents: parents ? Number(parents) : 0,
      interior,
    },
  };

  return xcmVersionedMultiLocation;
};

export const makeAsssetMultiAsset = ({
  assetId,
  palletInstance = 50,
  amount,
  parents = 0,
}: MakeXcmVersionedMultiAssetsProps) => {
  const xcmVersionedMultiLocation = {
    V1: [
      {
        id: {
          Concrete: {
            parents,
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
    ],
  };

  return xcmVersionedMultiLocation;
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
  if (!api.tx?.xcmPallet && !api.tx.polkadotXcm) {
    throw new Error("xcmPallet or polkadotXcm unsupported");
  }

  return api.tx.xcmPallet ? "xcmPallet" : "polkadotXcm";
};
