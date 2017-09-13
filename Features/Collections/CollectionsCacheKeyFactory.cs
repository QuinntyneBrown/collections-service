using System;

namespace CollectionsService.Features.Collections
{
    public class CollectionsCacheKeyFactory
    {
        public static string Get(Guid tenantId) => $"[Collections] Get {tenantId}";
        public static string GetById(Guid tenantId, int id) => $"[Collections] GetById {tenantId}-{id}";
    }
}
