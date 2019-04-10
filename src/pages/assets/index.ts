// @index('./*.{svg,png,jpg}', (pp, cc) => `export const img${cc.upperCaseFirst(pp.name)} = require('${pp.path}${pp.ext}')`)
export const imgLogo = require('./logo.svg')
