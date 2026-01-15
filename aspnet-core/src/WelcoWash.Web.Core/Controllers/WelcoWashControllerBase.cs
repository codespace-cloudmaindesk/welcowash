using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace WelcoWash.Controllers
{
    public abstract class WelcoWashControllerBase: AbpController
    {
        protected WelcoWashControllerBase()
        {
            LocalizationSourceName = WelcoWashConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
