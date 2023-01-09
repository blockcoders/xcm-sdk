import { ApiPromise } from '@polkadot/api'
import { u8aToHex } from '@polkadot/util'
import { decodeAddress } from '@polkadot/util-crypto'
import { XcmVersionedMultiLocation } from './interfaces/generics'
import { MakeXcmVersionedMultiAssetsProps, MakeXcmVersionedMultiLocationProps } from './interfaces/utils-interfaces'

export const makeXcmVersionedMultiLocation = ({
  parents,
  target,
  value,
}: MakeXcmVersionedMultiLocationProps): XcmVersionedMultiLocation => {
  let interior: any = 'Here'

  if (target === 'Parachain') {
    interior = {
      X1: {
        Parachain: Number(value),
      },
    }
  }

  if (target === 'AccountId32') {
    const account = String(value)
    const isHex = account.startsWith('0x')

    const accountId = isHex ? value : u8aToHex(decodeAddress(account))

    interior = {
      X1: {
        AccountId32: {
          network: 'Any',
          id: accountId,
        },
      },
    }
  }

  return {
    V1: {
      parents: parents ? Number(parents) : 0,
      interior,
    },
  }
}

export const makeAsssetMultiAsset = ({
  assetId,
  palletInstance = 50,
  amount,
  parents = 0,
}: MakeXcmVersionedMultiAssetsProps) => {
  const xcmVersionedMultiLocation = {
    V1: [
      {
        id: {
          Concrete: {
            parents,
            interior: !assetId
              ? 'Here'
              : {
                  X2: [
                    {
                      PalletInstance: palletInstance,
                    },
                    {
                      GeneralIndex: assetId,
                    },
                  ],
                },
          },
        },
        fun: {
          Fungible: Number(amount),
        },
      },
    ],
  }

  return xcmVersionedMultiLocation
}

export const formatExtrinsicResponse = ({ res, rej, status, txHash, dispatchError, dispatchInfo }: any) => {
  if (status.isInBlock || status.isFinalized) {
    if (dispatchError) {
      rej(dispatchError.toString())
    } else if (dispatchInfo) {
      res(txHash.toString())
    }
  }
}

export const getPallet = (api: ApiPromise) => {
  const palletIsIncluded = Object.keys(api.tx).some((p) => ['xcmPallet', 'polkadotXcm'].includes(p))

  if (!palletIsIncluded) {
    throw new Error('xcmPallet or polkadotXcm unsupported')
  }

  return api.tx.xcmPallet ? 'xcmPallet' : 'polkadotXcm'
}
