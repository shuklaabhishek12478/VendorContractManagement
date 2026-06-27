using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Infrastructure
{
    public class CacheService : ICacheService
    {
        private readonly IDistributedCache _cache;

        public CacheService(IDistributedCache cache)
        {
            _cache = cache;
        }

        public Task<string?> GetAsync(string key)
            => _cache.GetStringAsync(key);

        public Task SetAsync(string key, string value, TimeSpan expiry)
            => _cache.SetStringAsync(key, value,
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = expiry
                });

        public Task RemoveAsync(string key)
            => _cache.RemoveAsync(key);
    }
}
