# XCM SDK

## Instalar

```sh
npm i <pending>
```

## Importar

```ts
// JavaScript
const { Provider } = require("<pending>");

// TypeScript
import { Provider } from "<pending>";
```

## Proveedor

```ts
const provider = new Provider(rpc, sender);
```

<table>
  <tr>
    <th>Parametro</th>
    <th>Descripcion</th>
  </tr>
  <tr>
    <td>rpc</td>
    <td>rpc URL</td>
  </tr>
    <tr>
    <td>sender</td>
    <td>firmante de la transacción</td>
  </tr>
</table>

### Ejemplos

Si quieres firmar con Alice en un nodo local:

```ts
const rpc = "ws://127.0.0.1:37345";
await cryptoWaitReady();

const keyring = new Keyring({ type: "sr25519" });
const sender = keyring.addFromUri("//Alice");

const provider = new Provider(rpc, sender);
```

Si quieres firmar con una semilla mnemotécnica

```ts
const sender = keyring.addFromMnemonic("<your mnemonic seed here>");
```

## Metodos soportados

<a href="https://wiki.polkadot.network/docs/learn-xcm#reserve-asset-transfer"> Reserve Asset Transfer </a> con los metodos reserveTransferAsset y LimitedReserveTransferAsset y <a href="https://wiki.polkadot.network/docs/learn-xcm#asset-teleportation">Asset teleportation </a> con los metodos teleportAsset y LimitedTeleportAsset.

```ts
provider.limitedReserveTransferAssets(params);

provider.reserveTransferAssets(params);

provider.limitedReserveTransferAssets(params);

provider.reserveTransferAssets(params);
```

### Parametros de los metodos

<table>
  <tr>
    <th>Parametro</th>
    <th>Descripcion</th>
  </tr>
  <tr>
    <td>destination</td>
    <td>El destino para transferir el activo. Si desea transferir activos de la cadena 'relay/principal' a una cadena 'parachain', configure 'Parachain'. Predeterminado 'Here'.</td>
  </tr>
    <td>destinationParents</td>
    <td>0 es el valor predeterminado, 1 cuando desea transferir de parachain a relaychain o de parachain a parachain</td>
  </tr>
  </tr>
    <td>destinationValue</td>
    <td>El valor de destino, por ejemplo, una identificación de parachain</td>
  </tr>
  <tr>
    <td>beneficiary</td>
    <td>objetivo del beneficiario, una accountId32</td>
  </tr>
  </tr>
    <td>beneficiaryParents</td>
    <td>0 por defecto</td>
  </tr>
  <tr>
    <td>beneficiaryValue</td>
    <td>El valor del beneficiario, la dirección de la cuenta para enviar el activo</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>cantidad de tokens a transferir</td>
  </tr>
    <td>assetId</td>
    <td>El identificador del asset para transferir desde una parachain, asegúrese de que la parachain admita el activo y que la cuenta del remitente tenga suficientes activos para transferir</td>
  </tr>
  <tr>
    <td>weightLimit</td>
    <td>Opcional, solo para métodos limitados. Establece el peso máximo para la transaccion</td>
  </tr>
</table>

### Descargo de responsabilidad

Depende de la configuración de la parachain o la relay chain, debe usar la teletransportación de activos o la transferencia de activos de reserva. Asegúrese de saber qué método usar antes de ejecutar cualquier transferencia. Puedes buscar en cualquier escaneo para saber, por ejemplo <a href="https://rococo.subscan.io/xcm_transfer">rococo scan</a>

## Ejemplos en Rococo

Si quieres hacer pruebas en Testnet, tienes Rococo.
</br>
Consigue algunos activos: <a href="https://app.element.io/#/room/#rococo-faucet:matrix.org">Rococo faucet</a>

### Enviar activos de Rococo a Rockmine

```ts
const destination = "Parachain";
const destinationValue = 2000; // Rockmine parchain id
const beneficiary = "AccountId32";
const beneficiaryValue = "<rockmine account address>"; // account address
const amount = 1000000000000000;

const res = await provider.limitedTeleportAssets({
  destination,
  destinationValue,
  beneficiary,
  beneficiaryValue,
  amount,
});
```

### Enviar activos de RockMine a Rococo

```ts
const destinationParents = 1; // Destination to Rococo
const beneficiary = "AccountId32";
const beneficiaryValue = "<rococo account address>"; // account address
const amount = 1000000000000000;

const res = await provider.limitedTeleportAssets({
  destination,
  destinationValue,
  beneficiary,
  beneficiaryValue,
  amount,
});
```

### Enviar activos nativos (ROC) de RockMine a Dali

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

### Enviar activo de Rococo a Dali

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
