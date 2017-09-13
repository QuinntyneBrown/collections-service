using MediatR;
using CollectionsService.Data;
using CollectionsService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace CollectionsService.Features.CollectionItems
{
    public class GetCollectionItemsQuery
    {
        public class Request : BaseRequest, IRequest<Response> { }

        public class Response
        {
            public ICollection<CollectionItemApiModel> CollectionItems { get; set; } = new HashSet<CollectionItemApiModel>();
        }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(CollectionsServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Response> Handle(Request request)
            {
                var collectionItems = await _context.CollectionItems
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new Response()
                {
                    CollectionItems = collectionItems.Select(x => CollectionItemApiModel.FromCollectionItem(x)).ToList()
                };
            }

            private readonly CollectionsServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
