import { ApiPromise, WsProvider } from "@polkadot/api";
import { AddressOrPair } from "./interfaces/generics";
import {
  TransferAssetsProps,
  LimitedTransferAssetsProps,
} from "./interfaces/methods";
import { makeXcmVersionesMultiLocation } from "./utils";

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
    const {
      destination,
      destinationValue,
      beneficiary,
      beneficiaryValue,
      amount,
      feeAssetItem,
    } = props;

    const api = await this.getApi();

    if (!api.tx.xcmPallet?.reserveTransferAssets)
      throw new Error("No reserveTransferAssets method found");

    let _dest = makeXcmVersionesMultiLocation(destination, destinationValue);

    let _beneficiary = makeXcmVersionesMultiLocation(
      beneficiary,
      beneficiaryValue
    );

    // make assets
    let _assets = {
      V1: [
        {
          id: {
            Concrete: {
              parents: 0,
              interior: "Here",
            },
          },
          fun: {
            Fungible: Number(amount),
          },
        },
      ],
    };

    const _feeAssetItem = feeAssetItem || 0;

    return api.tx.xcmPallet
      ?.reserveTransferAssets(_dest, _beneficiary, _assets, _feeAssetItem)
      .signAndSend(this.signer);
  }

  public async limitedTransferAssets(props: LimitedTransferAssetsProps) {
    const {
      destination,
      destinationValue,
      beneficiary,
      beneficiaryValue,
      amount,
      feeAssetItem,
      weightLimit,
    } = props;

    const api = await this.getApi();

    if (!api.tx.xcmPallet?.limitedTransferAssets)
      throw new Error("No limitedTransferAssets method found");

    let _dest = makeXcmVersionesMultiLocation(destination, destinationValue);

    let _beneficiary = makeXcmVersionesMultiLocation(
      beneficiary,
      beneficiaryValue
    );

    // make assets
    let _assets = {
      V1: [
        {
          id: {
            Concrete: {
              parents: 0,
              interior: "Here",
            },
          },
          fun: {
            Fungible: Number(amount),
          },
        },
      ],
    };

    const _feeAssetItem = feeAssetItem || 0;

    const _weightLimit = weightLimit ? { Limited: weightLimit } : "Unlimited";

    return api.tx.xcmPallet
      ?.limitedTransferAssets(
        _dest,
        _beneficiary,
        _assets,
        _feeAssetItem,
        _weightLimit
      )
      .signAndSend(this.signer);
  }

  public async teleportAssets(props: TransferAssetsProps) {
    const {
      destination,
      destinationValue,
      beneficiary,
      beneficiaryValue,
      amount,
      feeAssetItem,
    } = props;

    const api = await this.getApi();

    if (!api.tx.xcmPallet?.teleportAssets)
      throw new Error("No teleportAssets method found");

    let _dest = makeXcmVersionesMultiLocation(destination, destinationValue);

    let _beneficiary = makeXcmVersionesMultiLocation(
      beneficiary,
      beneficiaryValue
    );

    // make assets
    let _assets = {
      V1: [
        {
          id: {
            Concrete: {
              parents: 0,
              interior: "Here",
            },
          },
          fun: {
            Fungible: Number(amount),
          },
        },
      ],
    };

    const _feeAssetItem = feeAssetItem || 0;

    return api.tx.xcmPallet
      ?.teleportAssets(_dest, _beneficiary, _assets, _feeAssetItem)
      .signAndSend(this.signer);
  }

  public async limitedTeleportAssets(props: LimitedTransferAssetsProps) {
    const {
      destination,
      destinationValue,
      beneficiary,
      beneficiaryValue,
      amount,
      feeAssetItem,
      weightLimit,
    } = props;

    const api = await this.getApi();

    if (!api.tx.xcmPallet?.limitedTeleportAssets)
      throw new Error("No limitedTeleportAssets method found");

    let _dest = makeXcmVersionesMultiLocation(destination, destinationValue);

    let _beneficiary = makeXcmVersionesMultiLocation(
      beneficiary,
      beneficiaryValue
    );

    // make assets
    let _assets = {
      V1: [
        {
          id: {
            Concrete: {
              parents: 0,
              interior: "Here",
            },
          },
          fun: {
            Fungible: Number(amount),
          },
        },
      ],
    };

    const _feeAssetItem = feeAssetItem || 0;

    const _weightLimit = weightLimit ? { Limited: weightLimit } : "Unlimited";

    return api.tx.xcmPallet
      ?.limitedTeleportAssets(
        _dest,
        _beneficiary,
        _assets,
        _feeAssetItem,
        _weightLimit
      )
      .signAndSend(this.signer);
  }
}
