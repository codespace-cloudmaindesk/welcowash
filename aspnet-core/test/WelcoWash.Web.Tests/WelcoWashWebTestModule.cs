using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using WelcoWash.EntityFrameworkCore;
using WelcoWash.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace WelcoWash.Web.Tests
{
    [DependsOn(
        typeof(WelcoWashWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class WelcoWashWebTestModule : AbpModule
    {
        public WelcoWashWebTestModule(WelcoWashEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(WelcoWashWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(WelcoWashWebMvcModule).Assembly);
        }
    }
}