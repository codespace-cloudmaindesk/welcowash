using Abp.Application.Services;
using WelcoWash.ServiceOfferings.Dto;
using System;

namespace WelcoWash.ServiceOfferings
{
    public interface IServiceOfferingAppService
        : IAsyncCrudAppService<ServiceOfferingDto, Guid>
    {
    }
}
