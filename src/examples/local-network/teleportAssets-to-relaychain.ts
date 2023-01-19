import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { Provider } from '../../provider'
import { localNetworkUtils } from './local-network-utils'

const main = async () => {
  const rpc = localNetworkUtils.parachain1Rpc
  const destinationParents = 1
  const beneficiary = 'AccountId32'
  const beneficiaryValue = localNetworkUtils.relayChainDestintionAccount
  const assetParents = 1
  const amount = 1000000000000

  await cryptoWaitReady()

  const keyring = new Keyring({ type: 'sr25519' })
  const sender = keyring.addFromUri('//Alice')

  const provider = new Provider(rpc, sender)

  const res = await provider.limitedTeleportAssets({
    destinationParents,
    beneficiary,
    beneficiaryValue,
    assetParents,
    amount,
  })

  console.log(res)
}

main().then(() => process.exit(1))

/**
npx ts-node src/examples/local-network/limitedTeleportAssets-to-relaychain.ts
 */
