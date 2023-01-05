export const accentColor = '#D0BD7D'
export const bgColor = '#fff'

export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = typeof window !== 'undefined'

export const IS_PRODUCTION = process.env.APP_ENV === 'production'
