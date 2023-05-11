export const getProductUrl = (slug: string) => `/product/${slug}`;
export const getCategoryUrl = (slug: string) => `/category/${slug}`;
export const getAddUrl = (slug: string) => `/add/${slug}`;
export const getWorkUrl = (slug: string) => `/work/${slug}`;
export const getNewUrl = (slug: string) => `/new/${slug}`;
export const getBrandUrl = (slug: string) => `/brand/${slug}`;

export const getAdminUrl = (url: string) => `/manage/${url}`;
export const getAdminHomeUrl = () => getAdminUrl(``).slice(0, -1);
