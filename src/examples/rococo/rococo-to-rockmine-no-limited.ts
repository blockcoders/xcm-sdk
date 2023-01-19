import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { Provider } from '../../provider'
import { rococoExampleUtils } from './rococo-examples-utils'

const main = async () => {
  const rpc = rococoExampleUtils.rococoRpc
  const destination = 'Parachain'
  const destinationValue = rococoExampleUtils.rockMineParachainId
  const beneficiary = 'AccountId32'
  const beneficiaryValue = rococoExampleUtils.rockmineDestinationAccount
  const amount = rococoExampleUtils.rocAmount

  await cryptoWaitReady()

  const keyring = new Keyring({ type: 'sr25519' })
  const sender = keyring.addFromMnemonic(rococoExampleUtils.senderMnemonic)

  const provider = new Provider(rpc, sender)

  const res = await provider.teleportAssets({
    destination,
    destinationValue,
    beneficiary,
    beneficiaryValue,
    amount,
  })

  console.log(res)
}

main().then(() => process.exit(1))

/**
npx ts-node src/examples/rococo/rococo-to-rockmine-no-limited.ts
 */
