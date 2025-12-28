export interface CacheOptions {
    ttlMinutes?: number;
    key: string;
}

interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number; // in milliseconds
}

const DEFAULT_TTL_MINUTES = 20;

/**
 * A utility to fetch data with client-side caching (localStorage).
 * Simulates ISR by serving stale data until TTL expires.
 * 
 * @param key The unique cache key.
 * @param fetcher The async function to fetch data if cache is missing or expired.
 * @param ttlMinutes Time to live in minutes (default: 20).
 * @returns The data (T).
 */
export async function fetchWithCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMinutes: number = DEFAULT_TTL_MINUTES
): Promise<T> {
    const storageKey = `cache_${key}`;
    const now = Date.now();

    // 1. Try to get from cache
    try {
        const cachedRaw = localStorage.getItem(storageKey);
        if (cachedRaw) {
            const entry: CacheEntry<T> = JSON.parse(cachedRaw);
            const age = now - entry.timestamp;

            if (age < entry.ttl) {
                console.log(`[Cache Hit] Serving '${key}' from cache. Age: ${(age / 1000 / 60).toFixed(1)}m. TTL: ${ttlMinutes}m.`);
                return entry.data;
            } else {
                console.log(`[Cache Expired] '${key}' expired. Age: ${(age / 1000 / 60).toFixed(1)}m. Refreshing...`);
            }
        } else {
            console.log(`[Cache Miss] '${key}' not found in cache. Fetching...`);
        }
    } catch (e) {
        console.warn(`[Cache Error] Failed to read/parse cache for '${key}'.`, e);
    }

    // 2. Fetch fresh data
    try {
        const data = await fetcher();

        // 3. Save to cache
        try {
            const entry: CacheEntry<T> = {
                data,
                timestamp: now,
                ttl: ttlMinutes * 60 * 1000
            };
            localStorage.setItem(storageKey, JSON.stringify(entry));
            console.log(`[Cache Set] Saved '${key}' to cache. TTL: ${ttlMinutes}m.`);
        } catch (e) {
            console.warn(`[Cache Error] Failed to write cache for '${key}'. Storage might be full.`, e);
        }

        return data;
    } catch (error) {
        // Fallback: If fetch fails, try to return expired cache if it exists?
        // For now, let's just re-throw to be safe, or we could handle offline-first strategy here.
        // But adhering to the requirement "Eliminate unnecessary cache that involves no ISR", we should primarily rely on fetch logic if cache is bad.
        // However, if we have *expired* cache, and network fails, returning expired is better than crashing.

        try {
            const cachedRaw = localStorage.getItem(storageKey);
            if (cachedRaw) {
                const entry: CacheEntry<T> = JSON.parse(cachedRaw);
                console.warn(`[Cache Fallback] Fetch failed for '${key}', serving EXPIRED cache as fallback.`);
                return entry.data;
            }
        } catch (_) { /* ignore */ }

        throw error;
    }
}

/**
 * Clears a specific cache entry.
 */
export function clearCache(key: string) {
    localStorage.removeItem(`cache_${key}`);
}

/**
 * Clears all app-related cache.
 */
export function clearAllCache() {
    Object.keys(localStorage).forEach(k => {
        if (k.startsWith('cache_')) {
            localStorage.removeItem(k);
        }
    });
}
