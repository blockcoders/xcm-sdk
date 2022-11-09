import { destination } from "./generics";
export interface ReserverTransferAssetProps {
  destination: destination;
  destinationValue: string | string[];
  beneficiary: destination;
  beneficiaryValue: string;
  amount: number;
  feeAssetItem?: number;
}
