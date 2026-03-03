using Abp.Application.Services;
using WelcoWash.ServiceOfferings.Dto;
using System;
using System.Threading.Tasks;

namespace WelcoWash.ServiceOfferings
{
    public interface IServiceOfferingAppService
        : IAsyncCrudAppService<ServiceOfferingDto, Guid>
    {
        Task<ServiceOfferingDto> SetAvailabilityAsync(Guid serviceId, bool isAvailable);
        Task<ServiceOfferingDto> UpdatePriceAsync(Guid serviceId, decimal newPrice);
    }
}
