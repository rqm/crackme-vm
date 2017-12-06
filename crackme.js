'use strict'
// Crack me if you can. No patching. Solution === license key
const vm = require('vm')
const stdin = process.openStdin()
console.log('Enter license key:')
stdin.addListener('data', raw => {
  raw = raw.toString().trim()
  const sandbox = { goodboy () { console.log('Good job.') } }
  function badboy () { console.log('Nope.') }
  try {
    let payload = ''
    const license = Buffer.from(raw, 'hex')
    for (const l of license) payload += String.fromCharCode((l ^ 0xa2) - 0x3b)
    const context = vm.createContext(sandbox)
    const script = new vm.Script(payload.replace(/goodboy|eval/g))
    script.runInContext(context)
  } catch (e) {
    badboy()
  }
  process.exit()
})
