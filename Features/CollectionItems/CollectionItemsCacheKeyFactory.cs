using System;

namespace CollectionsService.Features.CollectionItems
{
    public class CollectionItemsCacheKeyFactory
    {
        public static string Get(Guid tenantId) => $"[CollectionItems] Get {tenantId}";
        public static string GetById(Guid tenantId, int id) => $"[CollectionItems] GetById {tenantId}-{id}";
    }
}
