import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { Provider } from '../../provider'
import { localNetworkUtils } from './local-network-utils'

const main = async () => {
  const rpc = localNetworkUtils.relayRpc
  const destination = 'Parachain'
  const destinationValue = localNetworkUtils.parachain1ChainId
  const beneficiary = 'AccountId32'
  const beneficiaryValue = localNetworkUtils.parachain1DestinationAccount
  const amount = 500000000000

  await cryptoWaitReady()

  const keyring = new Keyring({ type: 'sr25519' })
  const sender = keyring.addFromUri('//Alice')

  const provider = new Provider(rpc, sender)

  const res = await provider.limitedTeleportAssets({
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
npx ts-node src/examples/local-network/limitedTeleportAssets-to-para1000.ts 
 */
