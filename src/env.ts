import { inBrowser, inWechatMiniProgram } from 'vtils'

/**
 * 是否在 H5 环境中
 */
export const inH5: boolean = inBrowser()

/**
 * 是否在小程序环境中
 */
export const inWeapp: boolean = inWechatMiniProgram()
