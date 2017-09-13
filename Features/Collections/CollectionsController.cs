using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CollectionsService.Features.Core;

namespace CollectionsService.Features.Collections
{
    [Authorize]
    [RoutePrefix("api/collections")]
    public class CollectionController : BaseApiController
    {
        public CollectionController(IMediator mediator)
            :base(mediator) { }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateCollectionCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateCollectionCommand.Request request) => Ok(await Send(request));

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateCollectionCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateCollectionCommand.Request request) => Ok(await Send(request));
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetCollectionsQuery.Response))]
        public async Task<IHttpActionResult> Get() => Ok(await Send(new GetCollectionsQuery.Request()));

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetCollectionByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetCollectionByIdQuery.Request request) => Ok(await Send(request));

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveCollectionCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveCollectionCommand.Request request) => Ok(await Send(request));

    }
}
