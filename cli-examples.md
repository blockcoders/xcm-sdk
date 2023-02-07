CLI
====

## Local network:

### Relay to parachain

TeleportAssets:
```sh
xcm-sdk teleportAssets \
--rpc ws://127.0.0.1:9900 \
--mnemonic //Alice \
--dest Parachain \
--destV 1000 \
--ben AccountId32 \
--benV FoQJpPyadYccjavVdTWxpxU7rUEaYhfLCPwXgkfD6Zat9QP \
--a 1000000000000
```

LimitedTeleportAssets:
```sh
xcm-sdk limitedTeleportAssets \
--rpc ws://127.0.0.1:9900 \
--mnemonic //Alice \
--dest Parachain \
--destV 1000 \
--ben AccountId32 \
--benV FoQJpPyadYccjavVdTWxpxU7rUEaYhfLCPwXgkfD6Zat9QP \
--a 1000000000000
```

### Parachain to Relay

LimitedTeleportAssets:
```sh
xcm-sdk limitedTeleportAssets \
--rpc ws://127.0.0.1:9910 \
--mnemonic //Alice \
--destP 1 \
--ben AccountId32 \
--benV 5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty \
--assetP 1 \
--a 1000000000000
```
### Statemine to trappist

```sh
xcm-sdk limitedReserveTransferAssets \
--rpc ws://127.0.0.1:9910 \
--mnemonic //Alice \
--dest Parachain \
--destV 2000 \
--destP 1 \
--ben AccountId32 \
--benV 5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty \
--assetId 1 \
--a 1000000000000
```


## Rococo examples

### Rococo to rockmine

teleportAssets:
```sh
xcm-sdk teleportAssets \
--rpc wss://rococo-rpc.polkadot.io \
--mnemonic '<account mnemonic>' \
--dest Parachain \
--destV 1000 \
--ben AccountId32 \
--benV FP2c5N7fgNaUuBSD5E5G4RjPMQkVwz9NAZdp4LZFtKSPbmW \
--a 1000000000000
```

limitedTeleportAssets
```sh
xcm-sdk limitedTeleportAssets \
--rpc wss://rococo-rpc.polkadot.io \
--mnemonic '<account mnemonic>' \
--dest Parachain \
--destV 1000 \
--ben AccountId32 \
--benV '<rockmine destination account>' \
--a 1000000000000
```

### RockMine to Rococo

```sh
xcm-sdk limitedTeleportAssets \
--rpc wss://rococo-rockmine-rpc.polkadot.io \
--mnemonic '<account mnemonic>' \
--destP 1 \
--ben AccountId32 \
--benV '<rococo destination account>' \
--assetP 1 \
--a 1000000000000
```

### RockMine to Dali

```sh
xcm-sdk limitedTeleportAssets \
--rpc wss://rococo-rockmine-rpc.polkadot.io \
--mnemonic '<account mnemonic>' \
--dest Parachain
--destV 2110
--destP 1 \
--ben AccountId32 \
--benV '<rococo destination account>' \
--assetP 1 \
--a 1000000000000
```
5EsQwm2F3KMejFMzSNR2N74jEm8WhHAxunitRQ4bn66wea6F
