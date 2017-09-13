using CollectionsService.Features.Core;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json.Linq;
using System;

namespace CollectionsService.Features.Collections
{
    public interface ICollectionsEventBusMessageHandler: IEventBusMessageHandler { }

    public class CollectionsEventBusMessageHandler: ICollectionsEventBusMessageHandler
    {
        public CollectionsEventBusMessageHandler(ICache cache)
        {
            _cache = cache;
        }

        public void Handle(JObject message)
        {
            try
            {
                if ($"{message["type"]}" == CollectionsEventBusMessages.AddedOrUpdatedCollectionMessage)
                {
                    _cache.Remove(CollectionsCacheKeyFactory.Get(new Guid(message["tenantUniqueId"].ToString())));
                }

                if ($"{message["type"]}" == CollectionsEventBusMessages.RemovedCollectionMessage)
                {
                    _cache.Remove(CollectionsCacheKeyFactory.Get(new Guid(message["tenantUniqueId"].ToString())));
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
