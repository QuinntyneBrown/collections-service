using MediatR;
using CollectionsService.Data;
using CollectionsService.Model;
using CollectionsService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace CollectionsService.Features.Collections
{
    public class AddOrUpdateCollectionCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public CollectionApiModel Collection { get; set; }            
			public Guid CorrelationId { get; set; }
        }

        public class Response { }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(CollectionsServiceContext context, IEventBus bus)
            {
                _context = context;
                _bus = bus;
            }

            public async Task<Response> Handle(Request request)
            {
                var entity = await _context.Collections
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.Collection.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.Collections.Add(entity = new Collection() { TenantId = tenant.Id });
                }

                entity.Name = request.Collection.Name;
                
                await _context.SaveChangesAsync();

                _bus.Publish(new AddedOrUpdatedCollectionMessage(entity, request.CorrelationId, request.TenantUniqueId));

                return new Response();
            }

            private readonly CollectionsServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
