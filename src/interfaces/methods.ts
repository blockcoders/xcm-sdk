import { destination } from "./generics";
export interface TransferAssetsProps {
  destination: destination;
  destinationValue: string | string[];
  beneficiary: destination;
  beneficiaryValue: string;
  amount: number;
  feeAssetItem?: number;
}

export interface LimitedTransferAssetsProps extends TransferAssetsProps {
  weightLimit?: number;
}
