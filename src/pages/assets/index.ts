// @index('./*.{svg,png,jpg}', (pp, cc) => `export const icon${cc.upperCaseFirst(pp.name)} = require('${pp.path}${pp.ext}')`)
export const iconLogo = require('./logo.svg')
