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
    "anchor coyote island dog filter worth ride profit wheel produce random photo"
  );
```

## TeleportAssets, LimitedTeleportAssets, ReserveTransferAssets, LimitedReserveTransferAssets

<table>
  <tr>
    <th>Param</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>destination</td>
    <td>The destination to transfer the asset, can be a parachain</td>
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
    <td>asset id, 0 is default</td>
  </tr>
  <tr>
    <td>beneficiaryValue</td>
    <td>The beneficiary value, for example an account address</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>token amount to transfer</td>
  </tr>
  <tr>
    <td>weight</td>
    <td>only for limited methods</td>
  </tr>
</table>

### examples

```ts
  const destination = "Parachain"
  const destinationValue = 2000 // parchain id
  const beneficiary = "AccountId32"
  const beneficiaryValue = "0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48" // account address
  const amount = 1000000000000000

  const res = await provider.teleportAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });
```