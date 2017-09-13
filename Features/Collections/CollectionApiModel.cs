using CollectionsService.Model;

namespace CollectionsService.Features.Collections
{
    public class CollectionApiModel
    {        
        public int Id { get; set; }
        public int? TenantId { get; set; }
        public string Name { get; set; }

        public static TModel FromCollection<TModel>(Collection collection) where
            TModel : CollectionApiModel, new()
        {
            var model = new TModel();
            model.Id = collection.Id;
            model.TenantId = collection.TenantId;
            model.Name = collection.Name;
            return model;
        }

        public static CollectionApiModel FromCollection(Collection collection)
            => FromCollection<CollectionApiModel>(collection);

    }
}
