using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CollectionsService.Features.Core;

namespace CollectionsService.Features.CollectionItems
{
    [Authorize]
    [RoutePrefix("api/collectionItems")]
    public class CollectionItemController : BaseApiController
    {
        public CollectionItemController(IMediator mediator)
            :base(mediator) { }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateCollectionItemCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateCollectionItemCommand.Request request) => Ok(await Send(request));

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateCollectionItemCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateCollectionItemCommand.Request request) => Ok(await Send(request));
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetCollectionItemsQuery.Response))]
        public async Task<IHttpActionResult> Get() => Ok(await Send(new GetCollectionItemsQuery.Request()));

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetCollectionItemByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetCollectionItemByIdQuery.Request request) => Ok(await Send(request));

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveCollectionItemCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveCollectionItemCommand.Request request) => Ok(await Send(request));

    }
}
