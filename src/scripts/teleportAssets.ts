import { Provider } from 'src/provider'
import { getArgsValues, getSender } from './utils'

const main = async () => {
  const args = getArgsValues()
  const sender = getSender(args.mnemonic)

  const provider = new Provider(args.rpc, sender)

  console.log('Sending tx...')
  const res = await provider.limitedTeleportAssets(args)

  console.log('tx sended')
  console.log('Result: ', res)
}

main()
  .then(() => process.exit(1))
  .catch((err) => console.log(err))
