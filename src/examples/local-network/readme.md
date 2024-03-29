Local Network Config
=======

This is a tutorial to run a local network with a rococo relay chain and two parachain (statemint and trappist).

You need to download <a href="https://github.com/paritytech/zombienet/releases">Zombienet for linux or macOs</a> and for test purposes we've prepared some parachain binaries that you can donwload all chains binaries from:

<ul>
  <li><a href="https://blockcoders.nyc3.cdn.digitaloceanspaces.com/xcm-sdk%2Fpolkadot">Polkadot</a></li>
  <li><a href="https://blockcoders.nyc3.cdn.digitaloceanspaces.com/xcm-sdk%2Fpolkadot-parachain">Polkadot Parachain</a></li>
  <li><a href="https://blockcoders.nyc3.cdn.digitaloceanspaces.com/xcm-sdk%2Ftrappist-collator">Trappist Collator</a></li>
</ul>


Then, create a folder called bin with all binaries inside and copy <a href="./config.toml">this config.toml</a>, your folder should look like this:

![](../../../.images/local-network/zombienet-folder.png)

make all binaries executable:

```sh
sudo chmod +x polkadot
sudo chmod +x polkadot-parachain
sudo chmod +x trappist-collator
sudo chmod +x zombienet-linux
```

run:

```sh
# or ./zombienet-macos
./zombienet-linux -p native spawn config.toml
```

If you you want to run it in windows see <a href="https://github.com/paritytech/zombienet">zombienet repo</a>.

## Relay chain and Parachains

There is a default config:

<ul>
  <li>Relay chain is in port 9900</li>
  <li>Statemine Parachain is in port 9910 with <Strong> id 1000 </strong> </li>
  <li>Trappist Parachain is in port 9920 with <strong> id 2000 </strong> </li>
  <li>Otrher Trappist Parachain is in port 9930 with <strong> id 3000 </strong> </li>
</ul>

## Config Assets

If you want to transfer asset between parachains, we already prepared a script that will create xUSD asset on Statemine and txUSD asset on Trappist. You will able to transfer only xUSD to txUSD. It takes ~30s to finish.

run script:

```sh
npx ts-node src/examples/local-network/config-assets.ts
```

Then, mint some asset to Alice (for the examples) or any account. We recommend to mint 10000000 (1 million of xUSD) to have enough xUSD to test transfers.

If you want to create you own assets, you can follow <a href="./manually-config-assets.md">this guide</a> that we've prepared.

## Examples

All the examples have alice as sender and bob as destination account per default. If you want to change it, modify src/examples/local-network/local-network-utils.ts

default config:

```ts
export const localNetworkUtils = {
  relayRpc: 'ws://127.0.0.1:9900',
  parachain1Rpc: 'ws://127.0.0.1:9911',
  parachain2Rpc: 'ws://127.0.0.1:9921',
  parachain1ChainId: 1000,
  parachain1DestinationAccount: 'FoQJpPyadYccjavVdTWxpxU7rUEaYhfLCPwXgkfD6Zat9QP', // bob account on statemine
  parachain2ChainId: 2000,
  parachain2DestinationAccount: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty', //bob account on trappist
  relayChainDestintionAccount: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty', // bob account on relay
}
```

### Transfer Asset from Relaychain to Statemine

command:
```ts
npx ts-node src/examples/local-network/teleportAssets-to-parachain.ts
```

manually:
```ts
  const destination = "Parachain"
  const destinationValue = 1000 // Statemine parchain id
  const beneficiary = "AccountId32"
  const beneficiaryValue = "<bob acount>" // account address
  const amount = 1000000000000000

  const res = await provider.teleportAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });
```

### Transfer Asset from Statemine to Relaychain

command:
```ts
npx ts-node src/examples/local-network/limitedTeleportAssets-to-relaychain.ts
```

manually:
```ts
  const destinationParents = 1
  const beneficiary = 'AccountId32'
  const beneficiaryValue = "<bob account>"
  const assetParents = 1
  const amount = 1000000000000

  const res = await provider.limitedTeleportAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  });
```

### Transfer xUSD from statemine to txUSD on Trappist

Make sure alice has enough xUSD minted, and you already run the script for the asset configuration.

command:
```ts
npx ts-node src/examples/local-network/limitedTeleportAssets-to-relaychain.ts
```

manually:
```ts
  const destination = 'Parachain'
  const destinationValue = 2000 // trappist parachain id
  const destinationParents = 1
  const beneficiary = 'AccountId32'
  const beneficiaryValue = "<bob account>"
  const assetId = 1 // xUSD
  const amount = 100000000000000 // 100 xUSD

  const res = await provider.limitedReserveTransferAssets({
    destination,
    destinationValue,
    destinationParents,
    beneficiary,
    beneficiaryValue,
    assetId,
    amount,
  })
```
