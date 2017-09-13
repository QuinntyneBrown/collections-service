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
    public class RemoveCollectionCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public int Id { get; set; }
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
                var collection = await _context.Collections.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                collection.IsDeleted = true;
                await _context.SaveChangesAsync();
                _bus.Publish(new RemovedCollectionMessage(request.Id, request.CorrelationId, request.TenantUniqueId));
                return new Response();
            }

            private readonly CollectionsServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
