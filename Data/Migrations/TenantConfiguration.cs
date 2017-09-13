using System.Data.Entity.Migrations;
using CollectionsService.Data;
using CollectionsService.Model;
using System;

namespace CollectionsService.Migrations
{
    public class TenantConfiguration
    {
        public static void Seed(CollectionsServiceContext context) {

            context.Tenants.AddOrUpdate(x => x.Name, new Tenant()
            {
                Name = "Default",
                UniqueId = new Guid("489902a0-a39d-4556-94b4-544d33d5ff5b")
            });

            context.SaveChanges();
        }
    }
}
