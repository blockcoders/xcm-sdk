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
