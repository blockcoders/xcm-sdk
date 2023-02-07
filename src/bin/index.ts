#!/usr/bin/env node
import { usage } from 'yargs'
import { commonArgsOptions, executeCommand, SUPPORTED_METHODS } from '../commands/utils'

usage('$0 <command> [args]')
  .strict()
  .command(
    'limitedReserveTransferAssets [..args]',
    'aa',
    function (yargs) {
      return yargs.options(commonArgsOptions as any)
    },
    function (argv) {
      executeCommand(argv, SUPPORTED_METHODS.limitedReserveTransferAssets)
    },
  )
  .command(
    'reserveTransferAssets [..args]',
    'aa',
    function (yargs) {
      return yargs.options(commonArgsOptions as any)
    },
    function (argv) {
      executeCommand(argv, SUPPORTED_METHODS.reserveTransferAssets)
    },
  )
  .command(
    'teleportAssets [..args]',
    'aa',
    function (yargs) {
      return yargs.options(commonArgsOptions as any)
    },
    function (argv) {
      executeCommand(argv, SUPPORTED_METHODS.teleportAssets)
    },
  )
  .command(
    'limitedTeleportAssets [..args]',
    'aa',
    function (yargs) {
      return yargs.options(commonArgsOptions as any)
    },
    function (argv) {
      executeCommand(argv, SUPPORTED_METHODS.limitedTeleportAssets)
    },
  )
  .demandCommand(1, 'You need to especify a method')
  .help().argv
