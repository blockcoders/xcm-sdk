import * as Keyring from "@polkadot/keyring";
import { ApiPromise } from "@polkadot/api";
import { Provider } from "../provider";
import {
  chainSpecsMock,
  SIGNER_MOCK,
  xcmPalletMock,
  XCM_PALLET_RESPONSES,
} from "./mocks/provider-mocks";
import sinon from "sinon";
import { expect } from "chai";

describe("Provider", () => {
  beforeEach(() => {
    sinon.stub(Keyring, "default").returns({
      addFromMnemonic: () => SIGNER_MOCK,
    });

    sinon.stub(ApiPromise, "create").returns({
      tx: {
        xcmPallet: xcmPalletMock,
      },
    } as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should instance", () => {
    const keyring = new Keyring.default({ type: "sr25519" });
    const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

    const provider = new Provider(chainSpecsMock.rpc, sender);

    expect(provider.rpc).to.equal(chainSpecsMock.rpc);
    expect(provider.signer).to.equal(SIGNER_MOCK);
  });

  describe("limited teleport assets", () => {
    it("should send teleport asset from relaychain to parachain", async () => {
      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.limitedTeleportAssets({
        destination,
        destinationValue,
        beneficiary,
        beneficiaryValue,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.limitedTeleportAssets);
    });

    it("should send teleport asset from parachain to relaychain", async () => {
      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.parachainRpc;
      const destinationParents = 1;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.relayAccount;
      const assetParents = 1;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.limitedTeleportAssets({
        destinationParents,
        beneficiary,
        beneficiaryValue,
        assetParents,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.limitedTeleportAssets);
    });
  });

  describe("teleport assets", () => {
    it("should send asset from relaychain to parachain", async () => {
      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.teleportAssets({
        destination,
        destinationValue,
        beneficiary,
        beneficiaryValue,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.teleportAssets);
    });
  });

  describe("limited reserve transfer assets", () => {
    it("should transfer asset from relaychain to parachain", async () => {
      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.limitedReserveTransferAssets({
        destination,
        destinationValue,
        beneficiary,
        beneficiaryValue,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.limitedReserveTransferAssets);
    });
  });

  describe("reserve transfer assets", () => {
    it("should transfer asset from relaychain to parachain", async () => {
      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.reserveTransferAssets({
        destination,
        destinationValue,
        beneficiary,
        beneficiaryValue,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.reserveTransferAssets);
    });
  });
});
