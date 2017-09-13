using CollectionsService.Model;

namespace CollectionsService.Features.CollectionItems
{
    public class CollectionItemApiModel
    {        
        public int Id { get; set; }
        public int? TenantId { get; set; }
        public string Name { get; set; }

        public static TModel FromCollectionItem<TModel>(CollectionItem collectionItem) where
            TModel : CollectionItemApiModel, new()
        {
            var model = new TModel();
            model.Id = collectionItem.Id;
            model.TenantId = collectionItem.TenantId;
            model.Name = collectionItem.Name;
            return model;
        }

        public static CollectionItemApiModel FromCollectionItem(CollectionItem collectionItem)
            => FromCollectionItem<CollectionItemApiModel>(collectionItem);

    }
}
