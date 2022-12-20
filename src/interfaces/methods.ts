import { destination } from "./generics";
export interface TransferAssetsProps {
  destination?: destination;
  destinationParents?: number;
  destinationValue?: string;
  beneficiary: destination;
  beneficiaryValue?: string;
  assetParents?: number;
  amount: number;
  feeAssetItem?: number;
  assetId?: number;
}

export interface LimitedTransferAssetsProps extends TransferAssetsProps {
  weightLimit?: number;
}
