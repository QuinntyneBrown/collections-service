using CollectionsService.Model;
using CollectionsService.Features.Core;
using System;

namespace CollectionsService.Features.Collections
{

    public class AddedOrUpdatedCollectionMessage : BaseEventBusMessage
    {
        public AddedOrUpdatedCollectionMessage(Collection collection, Guid correlationId, Guid tenantId)
        {
            Payload = new { Entity = collection, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = CollectionsEventBusMessages.AddedOrUpdatedCollectionMessage;        
    }
}
