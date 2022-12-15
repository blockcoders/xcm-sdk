import {
  MultiLocationTypes,
  XcmVersionesMultiLocation,
} from "./interfaces/generics";

export const makeXcmVersionesMultiLocation = (
  target: MultiLocationTypes,
  value: any
): XcmVersionesMultiLocation => {
  let val: XcmVersionesMultiLocation;

  let X1: any;

  if (target === "Parachain") {
    X1 = {
      Parachain: Number(value),
    };
  }

  if (target === "AccountId32") {
    X1 = {
      [target]: {
        network: "Any",
        id: value,
      },
    };
  }

  val = {
    V1: {
      parents: 0,
      interior: {
        X1,
      },
    },
  };

  return val;
};
