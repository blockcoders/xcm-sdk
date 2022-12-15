import {
  MultiLocationTypes,
  XcmVersionesMultiLocation,
} from "./interfaces/generics";

export const makeXcmVersionesMultiLocation = (
  target: MultiLocationTypes,
  value: any
): XcmVersionesMultiLocation => {
  let val: XcmVersionesMultiLocation;

  let interior: any;

  if (target === "Parachain") {
    interior = {
      Parachain: Number(value),
    };
  }

  if (target === "AccountId32") {
    interior = {
      target: {
        network: "Any",
        id: value,
      },
    };
  }

  val = {
    V1: {
      parents: 0,
      interior,
    },
  };

  return val;
};
