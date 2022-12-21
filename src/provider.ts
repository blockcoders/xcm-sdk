import { ApiPromise, WsProvider } from "@polkadot/api";
import { AddressOrPair, MultiLocationTypes } from "./interfaces/generics";
import { getPallet } from "./utils";
import {
  TransferAssetsProps,
  LimitedTransferAssetsProps,
} from "./interfaces/methods";
import {
  makeXcmVersionedMultiLocation,
  makeAsssetMultiAsset,
  formatExtrinsicResponse,
} from "./utils";

export class Provider {
  rpc: string;
  signer: AddressOrPair;

  constructor(rpc: string, signer: AddressOrPair) {
    this.rpc = rpc;
    this.signer = signer;
  }

  private async getApi() {
    return await ApiPromise.create({
      provider: new WsProvider(this.rpc),
    });
  }

  private prepareExtrinsic(props: LimitedTransferAssetsProps) {
    const {
      destination: _destination,
      destinationValue: _destinationValue,
      destinationParents: _destinationParents,
      beneficiary: _beneficiary,
      beneficiaryValue: _beneficiaryValue,
      amount: _amount,
      feeAssetItem: _feeAssetItem,
      assetParents: _assetParents,
      weightLimit: _weightLimit,
      assetId: _assetId,
    } = props;

    let dest = null;
    let beneficiary = null;
    let assets = null;
    let feeAssetItem = null;
    let weightLimit = null;

    dest = makeXcmVersionedMultiLocation({
      target: _destination as MultiLocationTypes,
      value: _destinationValue,
      parents: _assetParents,
    });

    beneficiary = makeXcmVersionedMultiLocation({
      target: _beneficiary as MultiLocationTypes,
      value: _beneficiaryValue,
    });

    assets = makeAsssetMultiAsset({
      amount: _amount,
      parents: _assetParents,
      assetId: _assetId,
    });

    feeAssetItem = _feeAssetItem || 0;

    weightLimit = _weightLimit ? { Limited: _weightLimit } : "Unlimited";

    return {
      dest,
      beneficiary,
      assets,
      feeAssetItem,
      weightLimit,
    };
  }

  public async forceDefaultXcmVersion(xcmVersion: number | string) {
    const api = await this.getApi();

    if (!api?.tx?.sudo) throw new Error("No sudo tx method found");

    if (!api?.tx?.xcmPallet?.forceDefaultXcmVersion)
      throw new Error("No forceDefaultXcmVersion method found");

    return api.tx.sudo
      .sudo(api.tx.xcmPallet.forceDefaultXcmVersion(xcmVersion))
      .signAndSend(this.signer);
  }

  public async reserveTransferAssets(props: TransferAssetsProps) {
    const api = await this.getApi();

    const pallet = getPallet(api);

    if (!api.tx[pallet]?.reserveTransferAssets)
      throw new Error("No reserveTransferAssets method found");

    const { dest, beneficiary, assets, feeAssetItem } =
      this.prepareExtrinsic(props);

    return new Promise(async (res, rej) => {
      api.tx[pallet]
        ?.reserveTransferAssets(dest, beneficiary, assets, feeAssetItem)
        .signAndSend(
          this.signer,
          ({ status, txHash, dispatchError, dispatchInfo }: any) => {
            formatExtrinsicResponse({
              api,
              res,
              rej,
              status,
              txHash,
              dispatchError,
              dispatchInfo,
            });
          }
        );
    });
  }

  public async limitedReserveTransferAssets(props: LimitedTransferAssetsProps) {
    const api = await this.getApi();
    const pallet = getPallet(api);

    if (!api.tx[pallet]?.limitedReserveTransferAssets)
      throw new Error("No limitedReserveTransferAssets method found");

    const { dest, beneficiary, assets, feeAssetItem, weightLimit } =
      this.prepareExtrinsic(props);

    return new Promise(async (res, rej) => {
      api.tx[pallet]
        ?.limitedReserveTransferAssets(
          dest,
          beneficiary,
          assets,
          feeAssetItem,
          weightLimit
        )
        .signAndSend(
          this.signer,
          ({ status, txHash, dispatchError, dispatchInfo }: any) => {
            formatExtrinsicResponse({
              api,
              res,
              rej,
              status,
              txHash,
              dispatchError,
              dispatchInfo,
            });
          }
        );
    });
  }

  public async teleportAssets(props: TransferAssetsProps) {
    const api = await this.getApi();

    const pallet = getPallet(api);

    if (!api.tx[pallet]?.teleportAssets)
      throw new Error("No teleportAssets method found");

    const { dest, beneficiary, assets, feeAssetItem } =
      this.prepareExtrinsic(props);

    return new Promise(async (res, rej) => {
      api.tx[pallet]
        ?.teleportAssets(dest, beneficiary, assets, feeAssetItem)
        .signAndSend(
          this.signer,
          ({ status, txHash, dispatchError, dispatchInfo }: any) => {
            formatExtrinsicResponse({
              api,
              res,
              rej,
              status,
              txHash,
              dispatchError,
              dispatchInfo,
            });
          }
        );
    });
  }

  public async limitedTeleportAssets(props: LimitedTransferAssetsProps) {
    const api = await this.getApi();
    const pallet = getPallet(api);

    if (!api.tx[pallet]?.limitedTeleportAssets)
      throw new Error("No limitedTeleportAssets method found");

    const { dest, beneficiary, assets, feeAssetItem, weightLimit } =
      this.prepareExtrinsic(props);

    return new Promise(async (res, rej) => {
      api.tx[pallet]
        ?.limitedTeleportAssets(
          dest,
          beneficiary,
          assets,
          feeAssetItem,
          weightLimit
        )
        .signAndSend(
          this.signer,
          ({ status, txHash, dispatchError, dispatchInfo }: any) => {
            formatExtrinsicResponse({
              api,
              res,
              rej,
              status,
              txHash,
              dispatchError,
              dispatchInfo,
            });
          }
        );
    });
  }
}
