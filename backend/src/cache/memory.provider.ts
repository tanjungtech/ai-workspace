import type {
  CacheProvider,
} from "./cache.provider.js";

type CacheItem = {
  value: unknown;
  expiresAt: number;
};

const store =
  new Map<string, CacheItem>();

export const memoryCache:
  CacheProvider = {

    async get<T>(
      key: string
    ) {
       const item = store.get(key);

       if (!item) { return null};

       if (Date.now() > item.expiresAt) {
        store.delete(key);

        return null;
       }

       return item.value as T;
    },

    async set(
      key,
      value,
      ttl = 300
    ) {
      store.set(
        key,
        {
          value,
          expiresAt:
            Date.now() + ttl * 1000,
        }
      );
    },

    async del(key) {
      store.delete(key);
    },

    async clear() {
      store.clear();
    },
};
