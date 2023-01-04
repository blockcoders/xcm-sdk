export const chainSpecsMock = {
  rpc: 'ws://localhost:40320',
  senderMnemonic: 'charmander squirtle bulbasue pikachu',
  relayAccount: '0x2222222',
  parachainId: 1000,
  parachainAccount: '0x123456789',
  parachainRpc: 'ws://localhost:41000',
}

export const SIGNER_MOCK = {
  address: '0x123',
}

export const XCM_PALLET_RESPONSES = {
  reserveTransferAssets: '0x1234111',
  limitedReserveTransferAssets: '0x1234222',
  teleportAssets: '0x1234333',
  limitedTeleportAssets: '0x1234444',
}

export const xcmPalletMock = {
  reserveTransferAssets: () => ({
    signAndSend: (signer: any, cb: any) => {
      const status = { isInBlock: true }
      const txHash = XCM_PALLET_RESPONSES.reserveTransferAssets
      const dispatchError = ''
      const dispatchInfo = {}

      return cb({
        status,
        txHash,
        dispatchError,
        dispatchInfo,
      })
    },
  }),
  limitedReserveTransferAssets: () => ({
    signAndSend: (signer: any, cb: any) => {
      const status = { isInBlock: true }
      const txHash = XCM_PALLET_RESPONSES.limitedReserveTransferAssets
      const dispatchError = ''
      const dispatchInfo = {}

      return cb({
        status,
        txHash,
        dispatchError,
        dispatchInfo,
      })
    },
  }),
  teleportAssets: () => ({
    signAndSend: (signer: any, cb: any) => {
      const status = { isInBlock: true }
      const txHash = XCM_PALLET_RESPONSES.teleportAssets
      const dispatchError = ''
      const dispatchInfo = {}

      return cb({
        status,
        txHash,
        dispatchError,
        dispatchInfo,
      })
    },
  }),
  limitedTeleportAssets: () => ({
    signAndSend: (signer: any, cb: any) => {
      const status = { isInBlock: true, isFinalized: true }
      const txHash = XCM_PALLET_RESPONSES.limitedTeleportAssets
      const dispatchError = ''
      const dispatchInfo = {}

      return cb({
        status,
        txHash,
        dispatchError,
        dispatchInfo,
      })
    },
  }),
  limitedTeleportAssetsWithError: () => ({
    signAndSend: (signer: any, cb: any) => {
      const status = { isInBlock: true, isFinalized: true }
      const txHash = XCM_PALLET_RESPONSES.limitedTeleportAssets
      const dispatchError = {
        toString: () => 'tx error',
      }
      const dispatchInfo = ''

      return cb({
        status,
        txHash,
        dispatchError,
        dispatchInfo,
      })
    },
  }),
}

export const RPC_MOCK = 'ws://localhost:32011'
