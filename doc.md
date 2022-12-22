XCM SDK
=================


## Install

```sh
npm i <Pending>
```

## Usage

```ts
// JavaScript
const { Provider } = require(<pending>)

// TypeScript
import { Provider } from <pending>
```

## Provider

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
    <td>signer to sign the transaction</td>
  </tr>
</table>


### examples
If you want to sign with Alice in a local node:

```ts
  const rpc = "ws://127.0.0.1:37345"
  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromUri("//Alice");

  const provider = new Provider(rpc, sender);

```

If you want to generate generate with mnemonic

```ts
  const sender = keyring.addFromMnemonic(
    "<your mnemonic seed here>"
  );
```

## Supported Methods

For now only support for <a href="https://wiki.polkadot.network/docs/learn-xcm#reserve-asset-transfer"> Reserve Asset Transfer </a> with reserveTransferAsset and LimitedReserveTransferAsset methods and <a href="https://wiki.polkadot.network/docs/learn-xcm#asset-teleportation">Asset teleportation </a> with teleportAsset and LimitedTeleportAsset methods.

```ts
provider.limitedReserveTransferAssets(params)

provider.reserveTransferAssets(params)

provider.limitedReserveTransferAssets(params)

provider.reserveTransferAssets(params)
```

### methods params

<table>
  <tr>
    <th>Param</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>destination</td>
    <td>The destination to transfer the asset. If you want to transfer asset from relaychain to a parachain set 'Parachain'. Default 'Here'. </td>
  </tr>
    <td>destinationParents</td>
    <td>0 is default, 1 when you want to transfer from parachain to relaychain or parachain to parachain</td>
  </tr>
  </tr>
    <td>destinationValue</td>
    <td>The destination value, for example a parachain id</td>
  </tr>
  <tr>
    <td>beneficiary</td>
    <td>beneficary target, an accountId32</td>
  </tr>
  </tr>
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


### Send Asset from Rococo to Rockmine
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
```ts
  const destination = "Parachain";
  const destinationValue = 2087;
  const beneficiary = "AccountId32";
  const beneficiaryValue = "<dali account address>";
  const amount = 1000000000000000;


  const res = await provider.limitedReserveTransferAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });

```