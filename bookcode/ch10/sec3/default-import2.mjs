// node default-import2.mjs

'use strict'

console.log('// Default imports with renaming')

import CC from './modules/caesar.mjs'

const cipher = new CC(3)
const message = 'Meet me at the toga party'
const encrypted = cipher.encrypt(message)
const decrypted = cipher.decrypt(encrypted)
console.log('encrypted:', encrypted) // Phhw#ph#dw#wkh#wrjd#sduw|
console.log('decrypted:', decrypted) // Meet me at the toga party
