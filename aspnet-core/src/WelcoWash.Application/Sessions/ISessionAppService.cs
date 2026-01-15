using System.Threading.Tasks;
using Abp.Application.Services;
using WelcoWash.Sessions.Dto;

namespace WelcoWash.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
