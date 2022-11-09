import { XcmVersionesMultiLocation } from "./interfaces/generics";

export const makeXcmVersionesMultiLocation = (
  target: any,
  value: any
): XcmVersionesMultiLocation => {
  let val: XcmVersionesMultiLocation;

  if (Array.isArray(value)) {
    val = {
      V1: {
        parents: 0,
        interior: {
          [`X${value.length}`]: value.map((d) => ({
            [target]: Number(d),
          })),
        },
      },
    };
  } else {
    val = {
      V1: {
        parents: 0,
        interior: {
          X1: {
            [target]: Number(value),
          },
        },
      },
    };
  }

  return val;
};
