using System.Threading.Tasks;
using Abp.Application.Services;
using WelcoWash.Authorization.Accounts.Dto;

namespace WelcoWash.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
