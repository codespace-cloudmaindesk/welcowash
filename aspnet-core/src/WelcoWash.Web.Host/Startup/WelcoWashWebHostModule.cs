using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using WelcoWash.Configuration;

namespace WelcoWash.Web.Host.Startup
{
    [DependsOn(
       typeof(WelcoWashWebCoreModule))]
    public class WelcoWashWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public WelcoWashWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(WelcoWashWebHostModule).GetAssembly());
        }
    }
}
