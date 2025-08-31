import { commafy } from "xe-utils"

export const formatPrice = (price = {}, params = {}) => {
    const { digits = 2 } = params
    return commafy(Number(price) / 100, { digits: 2 })
}