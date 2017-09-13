using CollectionsService.Features.Core;
using System;

namespace CollectionsService.Features.CollectionItems
{
    public class RemovedCollectionItemMessage : BaseEventBusMessage
    {
        public RemovedCollectionItemMessage(int collectionItemId, Guid correlationId, Guid tenantId)
        {
            Payload = new { Id = collectionItemId, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = CollectionItemsEventBusMessages.RemovedCollectionItemMessage;        
    }
}
