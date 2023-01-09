XCM SDK
=======

[![npm](https://img.shields.io/npm/v/xcm-sdk)](https://www.npmjs.com/package/xcm-sdk)
[![CircleCI](https://circleci.com/gh/blockcoders/xcm-sdk/tree/main.svg?style=svg)](https://circleci.com/gh/blockcoders/xcm-sdk/tree/main)
[![Coverage Status](https://coveralls.io/repos/github/blockcoders/xcm-sdk/badge.svg?branch=main)](https://coveralls.io/github/blockcoders/xcm-sdk?branch=main)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/943e9d8d050d4f129d2a2c63afdd419b)](https://www.codacy.com/gh/blockcoders/xcm-sdk/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=blockcoders/xcm-sdk&amp;utm_campaign=Badge_Grade)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![CodeQL](https://github.com/blockcoders/xcm-sdk/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/blockcoders/xcm-sdk/actions/workflows/codeql-analysis.yml)

## About

XCM SDK is a tool that provides an interface to send XCM messages for Substrate based blockchains. This library is written in Typescript so it can be imported in a whole new set of applications or dApps that use Javascript/Typescript engines such as Node.js.

## Get Started

### Install

```sh
npm i xcm-sdk
```

### Usage

```ts
// JavaScript
const { Provider } = require("xcm-sdk")

// TypeScript
import { Provider } from "xcm-sdk"
```

### Provider

```ts
const provider = new Provider(rpc, sender)
```

<table>
  <tr>
    <th>Param</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>rpc</td>
    <td>rpc endpoint</td>
  </tr>
    <tr>
    <td>sender</td>
    <td>signer of the transaction</td>
  </tr>
</table>


### Examples
If you want to sign with Alice in a local node:

```ts
import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'

const rpc = "ws://127.0.0.1:37345" // local node ws
await cryptoWaitReady();

const keyring = new Keyring({ type: "sr25519" });
const sender = keyring.addFromUri("//Alice");

const provider = new Provider(rpc, sender);

```

If you want to sign with mnemonic

```ts
import { Keyring } from '@polkadot/keyring'

const sender = keyring.addFromMnemonic(
"<your mnemonic seed here>"
);
```

If you want to sign with polkadotjs extension
```ts
import { web3FromAddress, web3Accounts, web3Enable } from "@polkadot/extension-dapp";

const extensions = await web3Enable("<your app name>");
const accounts = await web3Accounts();
const accountId = accounts[0].address;

const injector = await web3FromAddress(accountId);

const provider = new Provider(rpc, accountId);
provider.setInjectorSigner(injector.signer);
```

## Supported Methods

<a href="https://wiki.polkadot.network/docs/learn-xcm#reserve-asset-transfer"> Reserve Asset Transfer </a> with reserveTransferAsset and LimitedReserveTransferAsset methods and <a href="https://wiki.polkadot.network/docs/learn-xcm#asset-teleportation">Asset teleportation </a> with teleportAsset and LimitedTeleportAsset methods.

```ts
provider.limitedReserveTransferAssets(params)

provider.reserveTransferAssets(params)

provider.limitedReserveTransferAssets(params)

provider.reserveTransferAssets(params)
```

### Methods parameters

<table>
  <tr>
    <th>Param</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>destination</td>
    <td>The destination to transfer the asset. If you want to transfer asset from relaychain to a parachain set 'Parachain'. Default 'Here'. </td>
  </tr>
  <tr>
    <td>destinationParents</td>
    <td>0 is default, 1 when you want to transfer from parachain to relaychain or parachain to parachain</td>
  </tr>
  <tr>
    <td>destinationValue</td>
    <td>The destination value, for example a parachain id</td>
  </tr>
  <tr>
    <td>beneficiary</td>
    <td>beneficary target, an accountId32</td>
  </tr>
  <tr>
    <td>beneficiaryParents</td>
    <td>0 is default</td>
  </tr>
  <tr>
    <td>beneficiaryValue</td>
    <td>The beneficiary value, account address to send the asset</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>token amount to transfer</td>
  </tr>
  <tr>
    <td>assetId</td>
    <td>AssetId to transfer from parachain, make sure the parchain support the asset and the sender account have enough asset to transfer</td>
  </tr>
  <tr>
    <td>weightLimit</td>
    <td>Optional, only for limited methods. Set the maximum weight for the extrinsic</td>
  </tr>
</table>

### Disclaimer
Depends on the parachain or relay chain configuration you have to use Asset teleportation or reserve asset transfer. Make sure you know what method use before execute any transfer. You can search in any scan to know, for example <a href="https://rococo.subscan.io/xcm_transfer">rococo scan</a>

## Rococo examples

If you want to tests in Testnet, you have Rococo.
</br>
Get some assets: <a href="https://app.element.io/#/room/#rococo-faucet:matrix.org">Rococo faucet</a>


### Config
The examples are in ./examples/rococo/, you can put your configuration in ./examples/rococo/rococo-examples-util.ts. Then you can run a command for each example. If you want to run them manually, you must create your own script (.js or ts) and import the dependencies.

```ts
export const rococoExampleUtils = {
  rococoRpc: 'wss://rococo-rpc.polkadot.io',
  rockMineRpc: 'wss://rococo-rockmine-rpc.polkadot.io',
  rockMineParachainId: 1000,
  daliParachainId: 2087,
  senderMnemonic: '<your account mnemonic>',
  rockmineDestinationAccount: '<rockmine address account>',
  daliDestinationAccount: '<dali destination account>',
  rococoDestinationAccount: '<rococo address account>',
  rocAmount: <amount to transfer>,
}
```

### Send Asset from Rococo to Rockmine

command:
```ts
npx ts-node src/examples/rococo/rococo-to-rockmine.ts
```

manually:
```ts
  const destination = "Parachain"
  const destinationValue = 2000 // Rockmine parchain id
  const beneficiary = "AccountId32"
  const beneficiaryValue = "<rockmine account address>" // account address
  const amount = 1000000000000000

  const res = await provider.limitedTeleportAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });
```

### Send Asset from RockMine to Rococo

command:
```ts
npx ts-node src/examples/rococo/rockmine-to-rococo.ts
```

manualy:

```ts
  const destinationParents = 1; // Destination to Rococo
  const beneficiary = "AccountId32"
  const beneficiaryValue = "<rococo account address>" // account address
  const amount = 1000000000000000


  const res = await provider.limitedTeleportAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });
```

### Send native Asset (ROC) from RockMine to Dali
command:
```ts
npx ts-node src/examples/rococo/rockmine-to-dali-roc.ts
```

manualy:
```ts
  const destination = "Parachain";
  const destinationValue = 2087; // dali parachain id
  const destinationParents = 1;
  const beneficiary = "AccountId32";
  const beneficiaryValue = "<dali account address>";
  const assetParents = 1; // native asset (ROC)
  const amount = 1000000000000000;

  const res = await provider.limitedReserveTransferAssets({
    destination,
    destinationValue,
    destinationParents,
    beneficiary,
    beneficiaryValue,
    assetParents,
    amount,
  });
```

### Send Asset from Rococo to dali

Make sure you have <a href="https://polkadot.js.org/apps/#/assets/balances"> assets </a> to transfer. It is also necessary to change the asset id in ./examples/rococo/rockmine-to-dali-asset.ts, default is 1984 (Rockmine USD).

```ts
npx ts-node src/examples/rococo/rockmine-to-dali-asset.ts
```

manualy
```ts
  const destination = "Parachain"
  const destinationValue = 2087
  const destinationParents = 1
  const beneficiary = 'AccountId32'
  const beneficiaryValue = "<dali account address>"
  const assetId = 1984   // asset id in rockmine
  const amount = 50000000000


  const res = await provider.limitedReserveTransferAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });
```



## Testing

Running the unit tests.

```sh
npm run test
```

Running the test coverage.

```sh
npm run test:cov
```

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Collaborators

- [**Jose Ramirez**](https://github.com/0xslipk)
- [**Fernando Sirni**](https://github.com/fersirni)
- [**Ruben Gutierrez**](https://github.com/RubenGutierrezC)

## License

Licensed under the MIT - see the [LICENSE](LICENSE) file for details.
