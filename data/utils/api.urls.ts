export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || process.env.API_BASE;
export const API_PROXY_BASE =
  process.env.API_PROXY_BASE || process.env.NEXT_PUBLIC_API_PROXY_BASE;

export const API_URLS = {
  base_url: API_BASE,
  auth: `${API_BASE}/api/auth`,
  users: `${API_BASE}/api/users`,
  storageFiles: `${API_BASE}/api/storage-files`,
  products: `${API_BASE}/api/products`,
  categories: `${API_BASE}/api/categories`,
};
