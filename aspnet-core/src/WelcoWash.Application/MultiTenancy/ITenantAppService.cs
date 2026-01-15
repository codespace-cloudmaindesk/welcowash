using Abp.Application.Services;
using WelcoWash.MultiTenancy.Dto;

namespace WelcoWash.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

