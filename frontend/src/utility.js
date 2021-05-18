export const getStringPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
}

export const getDate = (isoDate) => {
    return new Date(isoDate).toDateString().split(' ').slice(1).join(' ')
}

export const getDeliveryDate = (value) => {
    const day = new Date()
    const nextDay = new Date(day)
    nextDay.setDate(day.getDate() + value)
    return nextDay.toDateString()
}