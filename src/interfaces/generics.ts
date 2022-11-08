import { AccountId, Address } from "@polkadot/types/interfaces";
import { IKeyringPair } from "@polkadot/types/types";

export declare type AddressOrPair = IKeyringPair | string | AccountId | Address;

interface XcmV0MultiLocation {
  V0:
    | X1MultiLocationJunction
    | X2MultiLocationJunction
    | X3MultiLocationJunction
    | X4MultiLocationJunction
    | X5MultiLocationJunction
    | X6MultiLocationJunction
    | X7MultiLocationJunction
    | X8MultiLocationJunction;
}

// TODO: move to separate file
type XcmV1MultilocationJunctions =
  | {
      Parachain: number;
    }
  | {
      AccountId32: number;
    }
  | {};

interface X1MultiLocationJunction {
  X1: XcmV1MultilocationJunctions;
}

interface X2MultiLocationJunction {
  X2: XcmV1MultilocationJunctions[];
}

interface X3MultiLocationJunction {
  X3: XcmV1MultilocationJunctions[];
}

interface X4MultiLocationJunction {
  X4: XcmV1MultilocationJunctions[];
}

interface X5MultiLocationJunction {
  X5: XcmV1MultilocationJunctions[];
}

interface X6MultiLocationJunction {
  X6: XcmV1MultilocationJunctions[];
}

interface X7MultiLocationJunction {
  X7: XcmV1MultilocationJunctions[];
}

interface X8MultiLocationJunction {
  X8: XcmV1MultilocationJunctions[];
}

type XcmV1MultiLocationJunctions =
  | "Here"
  | X1MultiLocationJunction
  | X2MultiLocationJunction
  | X3MultiLocationJunction
  | X4MultiLocationJunction
  | X5MultiLocationJunction
  | X6MultiLocationJunction
  | X7MultiLocationJunction
  | X8MultiLocationJunction;

interface XcmV1MultiLocation {
  V1: {
    parents: number;
    interior: XcmV1MultiLocationJunctions;
  };
}

export type XcmVersionesMultiLocation = XcmV0MultiLocation | XcmV1MultiLocation;
