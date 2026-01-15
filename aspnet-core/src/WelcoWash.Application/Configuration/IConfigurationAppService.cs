using System.Threading.Tasks;
using WelcoWash.Configuration.Dto;

namespace WelcoWash.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
