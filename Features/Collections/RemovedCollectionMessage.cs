using CollectionsService.Features.Core;
using System;

namespace CollectionsService.Features.Collections
{
    public class RemovedCollectionMessage : BaseEventBusMessage
    {
        public RemovedCollectionMessage(int collectionId, Guid correlationId, Guid tenantId)
        {
            Payload = new { Id = collectionId, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = CollectionsEventBusMessages.RemovedCollectionMessage;        
    }
}
