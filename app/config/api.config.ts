export const API_URL = `${process.env.APP_URL}/api`
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`


export const getNewUrl = (string: string) => `/news${string}`
export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getProductsUrl = (string: string) => `/products${string}`
export const getCategoriesUrl = (string: string) => `/categories${string}`
export const getBrandsUrl = (string: string) => `/brands${string}`
export const getAddsUrl = (string: string) => `/adds${string}`
export const getRatingsUrl = (string: string) => `/ratings${string}`
export const getWorksUrl = (string: string) => `/works${string}`
