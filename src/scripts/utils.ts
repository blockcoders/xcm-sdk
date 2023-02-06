import { Keyring } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { options } from 'yargs'

const args = options({
  rpc: { type: 'string', demandOption: true },
  mnemonic: { type: 'string', demandOption: true },
  /*
    Destination

  */
  destination: { type: 'string', alias: 'dest' },
  destinationValue: { type: 'string', alias: 'destV' },
  destinationParents: { type: 'string', alias: 'destP' },
  /*
    Beneficiary
  */
  beneficiary: { type: 'string', alias: 'ben' },
  beneficiaryValue: { type: 'string', alias: 'benV' },
  /*
    Asset
  */
  amount: { type: 'string', alias: 'a' },
  feeAsset: { type: 'string', alias: 'feeAsset' },
  assetParents: { type: 'string', alias: 'assetP' },
  assetId: { type: 'string', alias: 'assetId' },
  /*
    Weight
  */
  weightLimit: { type: 'string', alias: 'wl' },
}).argv as any

export const getArgsValues = () => {
  const rpc = args['rpc']
  const mnemonic = args['mnemonic']
  const destinationV = args['destV']
  const destinationParents = args['destP']
  const beneficiary = args['ben']
  const beneficiaryValue = args['benV']
  const amount = args['a']
  const feeAsset = args['feeAsset']
  const assetParents = args['assetP']
  const assetId = args['assetId']
  const weightLimit = args['wl']

  return {
    rpc,
    mnemonic,
    destinationV,
    destinationParents,
    beneficiary,
    beneficiaryValue,
    amount,
    feeAsset,
    assetParents,
    assetId,
    weightLimit,
  }
}

export const getSender = (mnemonic: string) => {
  let sender: KeyringPair
  const keyring = new Keyring({ type: 'sr25519' })

  if (mnemonic.startsWith('//')) {
    sender = keyring.addFromUri(mnemonic)
  }

  sender = keyring.addFromMnemonic(mnemonic)

  return sender
}
