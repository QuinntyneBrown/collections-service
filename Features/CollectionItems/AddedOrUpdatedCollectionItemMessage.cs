using CollectionsService.Model;
using CollectionsService.Features.Core;
using System;

namespace CollectionsService.Features.CollectionItems
{

    public class AddedOrUpdatedCollectionItemMessage : BaseEventBusMessage
    {
        public AddedOrUpdatedCollectionItemMessage(CollectionItem collectionItem, Guid correlationId, Guid tenantId)
        {
            Payload = new { Entity = collectionItem, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = CollectionItemsEventBusMessages.AddedOrUpdatedCollectionItemMessage;        
    }
}
