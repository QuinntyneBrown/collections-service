using Newtonsoft.Json.Linq;

namespace CollectionsService.Features.Core
{
    public interface IEventBusMessageHandler
    {
        void Handle(JObject message);
    }
}