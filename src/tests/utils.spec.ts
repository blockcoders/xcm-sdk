import { getPallet } from "../utils";
import { expect, assert } from "chai";

describe("Utils", () => {
  describe("getPallet", () => {
    it("should return xcmPallet", () => {
      const mockApi = {
        tx: { xcmPallet: { reserveTransferAssets: () => null } },
      } as any;

      const pallet = getPallet(mockApi);

      expect(pallet).to.equal("xcmPallet");
    });

    it("should return polkadotXcm", () => {
      const mockApi = {
        tx: { polkadotXcm: { reserveTransferAssets: () => null } },
      } as any;
      const pallet = getPallet(mockApi);

      expect(pallet).to.equal("polkadotXcm");
    });

    it("should return error", () => {
      const mockApi = {
        tx: { xTokens: { transfer: () => null } },
      } as any;

      try {
        getPallet(mockApi);
        assert.fail("actual", "expected", "It shouldn't work ");
      } catch (error) {
        expect(String(error)).to.equal(
          "Error: xcmPallet or polkadotXcm unsupported"
        );
      }
    });
  });
});
