using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using WelcoWash.Authorization;

namespace WelcoWash
{
    [DependsOn(
        typeof(WelcoWashCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class WelcoWashApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<WelcoWashAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(WelcoWashApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
