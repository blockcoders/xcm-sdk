import Keyring from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { Provider } from '../../provider'
import { localNetworkUtils } from '../local-network/local-network-utils'

const main = async () => {
  const rpc = localNetworkUtils.relayRpc

  await cryptoWaitReady()

  const keyring = new Keyring({ type: 'sr25519' })
  const sender = keyring.addFromUri('//Alice')

  const provider = new Provider(rpc, sender)

  const body = {
    id: 0,
    xcm: {
      V2: [
        {
          Transact: {
            originType: 'Superuser',
            requireWeightAtMost: 100000000000,
            call: {
              encoded:
                '0x32150400d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d00d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d00d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d00d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d040100',
            },
          },
        },
      ],
    },
  }

  const res = await provider.extrinsic({
    pallet: 'parasSudoWrapper',
    method: 'sudoQueueDownwardXcm',
    body,
  })
  console.log(res)
}

main().then(() => process.exit(1))

/**
npx ts-node src/examples/extrinsic-generics/test.ts */
