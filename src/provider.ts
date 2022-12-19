import { ApiPromise, WsProvider } from "@polkadot/api";
import { AddressOrPair, MultiLocationTypes } from "./interfaces/generics";
import { getPallet } from "./utils";
import {
  TransferAssetsProps,
  LimitedTransferAssetsProps,
} from "./interfaces/methods";
import {
  makeXcmVersionesMultiLocation,
  makeAsssetMultiAsset,
  formatExtrinsicResponse,
} from "./utils";

export class Provider {
  private rpc: string;
  private signer: AddressOrPair;

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
      beneficiaryParents: _beneficiaryParents,
      amount: _amount,
      feeAssetItem: _feeAssetItem,
      weightLimit: _weightLimit,
    } = props;

    let dest = null;
    let beneficiary = null;
    let assets = null;
    let feeAssetItem = null;
    let weightLimit = null;

    dest = makeXcmVersionesMultiLocation(
      _destination as MultiLocationTypes,
      _destinationValue
    );

    beneficiary = makeXcmVersionesMultiLocation(
      _beneficiary as MultiLocationTypes,
      _beneficiaryValue
    );

    assets = makeAsssetMultiAsset({ amount: _amount });

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

    if (
      !api.tx.xcmPallet?.reserveTransferAssets &&
      !api.tx.polkadotXcm?.reserveTransferAssets
    )
      throw new Error("No reserveTransferAssets method found");

    const { dest, beneficiary, assets, feeAssetItem } =
      this.prepareExtrinsic(props);

    const pallet = getPallet(api);

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

  public async limitedTransferAssets(props: LimitedTransferAssetsProps) {
    const api = await this.getApi();

    if (!api.tx.xcmPallet?.limitedTransferAssets)
      throw new Error("No limitedTransferAssets method found");

    const { dest, beneficiary, assets, feeAssetItem, weightLimit } =
      this.prepareExtrinsic(props);

    const pallet = getPallet(api);

    return new Promise(async (res, rej) => {
      api.tx[pallet]
        ?.limitedTransferAssets(
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

    if (
      !api.tx.xcmPallet?.teleportAssets &&
      !api.tx.polkadotXcm?.teleportAssets
    )
      throw new Error("No teleportAssets method found");

    const { dest, beneficiary, assets, feeAssetItem } =
      this.prepareExtrinsic(props);

    const pallet = getPallet(api);

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

    if (
      !api.tx.xcmPallet?.limitedTeleportAssets &&
      !api.tx.polkadotXcm?.limitedTeleportAssets
    )
      throw new Error("No limitedTeleportAssets method found");

    const { dest, beneficiary, assets, feeAssetItem, weightLimit } =
      this.prepareExtrinsic(props);

    const pallet = getPallet(api);

    console.log("***dest***");
    console.log(JSON.stringify(dest));

    console.log("***benf***");
    console.log(JSON.stringify(beneficiary));

    console.log("***assets***");
    console.log(JSON.stringify(assets));

    console.log("***feeasset***");
    console.log(JSON.stringify(feeAssetItem));

    console.log("***weight***");
    console.log(JSON.stringify(weightLimit));

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
