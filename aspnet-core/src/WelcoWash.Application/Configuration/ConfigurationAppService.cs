using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using WelcoWash.Configuration.Dto;

namespace WelcoWash.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : WelcoWashAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
