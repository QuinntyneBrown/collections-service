using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CollectionsService.Features.Core
{
    public interface ICacheProvider
    {
        ICache GetCache();
    }
}
