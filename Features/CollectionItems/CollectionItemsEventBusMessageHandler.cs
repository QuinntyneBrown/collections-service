using CollectionsService.Features.Core;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json.Linq;
using System;

namespace CollectionsService.Features.CollectionItems
{
    public interface ICollectionItemsEventBusMessageHandler: IEventBusMessageHandler { }

    public class CollectionItemsEventBusMessageHandler: ICollectionItemsEventBusMessageHandler
    {
        public CollectionItemsEventBusMessageHandler(ICache cache)
        {
            _cache = cache;
        }

        public void Handle(JObject message)
        {
            try
            {
                if ($"{message["type"]}" == CollectionItemsEventBusMessages.AddedOrUpdatedCollectionItemMessage)
                {
                    _cache.Remove(CollectionItemsCacheKeyFactory.Get(new Guid(message["tenantUniqueId"].ToString())));
                }

                if ($"{message["type"]}" == CollectionItemsEventBusMessages.RemovedCollectionItemMessage)
                {
                    _cache.Remove(CollectionItemsCacheKeyFactory.Get(new Guid(message["tenantUniqueId"].ToString())));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private readonly ICache _cache;
    }
}
