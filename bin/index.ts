#!/usr/bin/env node

import { command } from 'yargs'
import { commonArgsOptions, executeCommand, SUPPORTED_METHODS } from '../src/commands/utils'

command(
  'teleportAsset [..args]',
  'aa',
  function (yargs) {
    return yargs.option('u', {
      alias: 'url',
      describe: 'the URL to make an HTTP request to',
    })
  },
  function (argv) {
    console.log(argv)
  },
).argv

command(
  'limitedTeleportAsset [..args]',
  'aa',
  function (yargs) {
    return yargs.options(commonArgsOptions as any)
  },
  function (argv) {
    executeCommand(argv, SUPPORTED_METHODS.limitedTeleportAssets)
  },
).argv
