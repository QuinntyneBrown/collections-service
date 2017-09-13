using MediatR;
using CollectionsService.Data;
using CollectionsService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace CollectionsService.Features.Collections
{
    public class GetCollectionsQuery
    {
        public class Request : BaseRequest, IRequest<Response> { }

        public class Response
        {
            public ICollection<CollectionApiModel> Collections { get; set; } = new HashSet<CollectionApiModel>();
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
                var collections = await _context.Collections
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new Response()
                {
                    Collections = collections.Select(x => CollectionApiModel.FromCollection(x)).ToList()
                };
            }

            private readonly CollectionsServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
