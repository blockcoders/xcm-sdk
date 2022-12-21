import * as Keyring from "@polkadot/keyring";
import { Provider } from "../provider";
import { chainSpecsMock } from "./mocks/provider-mocks";
import sinon from "sinon";
import { expect } from "chai";

describe("Provider", () => {
  beforeEach(() => {
    sinon.stub(Keyring, "default").returns({
      addFromMnemonic: () => ({
        address: "",
      }),
    });
  });

  it("should instance", () => {
    const keyring = new Keyring.default({ type: "sr25519" });
    const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

    const provider = new Provider(chainSpecsMock.rpc, sender);

    expect(provider.rpc).to.equal(chainSpecsMock.rpc);
  });
});
