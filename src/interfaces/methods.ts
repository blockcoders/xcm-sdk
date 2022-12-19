import { destination } from "./generics";
export interface TransferAssetsProps {
  destination: destination;
  destinationParents?: number;
  destinationValue: string;
  beneficiary: destination;
  beneficiaryParents?: number;
  beneficiaryValue: string;
  amount: number;
  feeAssetItem?: number;
}

export interface LimitedTransferAssetsProps extends TransferAssetsProps {
  weightLimit?: number;
}
