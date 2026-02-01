using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Threading.Tasks;
using WelcoWash.Domain.ServiceOfferings;
using WelcoWash.ServiceOfferings.Dto;

namespace WelcoWash.ServiceOfferings
{
    public class ServiceOfferingAppService
        : AsyncCrudAppService<
            ServiceOffering,
            ServiceOfferingDto,
            Guid,
            PagedAndSortedResultRequestDto,
            ServiceOfferingDto,
            ServiceOfferingDto>,
          IServiceOfferingAppService
    {
        private readonly IRepository<ServiceOffering, Guid> _serviceRepository;

        public ServiceOfferingAppService(
            IRepository<ServiceOffering, Guid> serviceRepository)
            : base(serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        public async Task<ServiceOfferingDto> SetAvailabilityAsync(Guid serviceId, bool isAvailable)
        {
            var service = await _serviceRepository.GetAsync(serviceId);
            service.IsAvailable = isAvailable;
            await _serviceRepository.UpdateAsync(service);

            return MapToEntityDto(service);
        }

        public async Task<ServiceOfferingDto> UpdatePriceAsync(Guid serviceId, double newPrice)
        {
            if (newPrice <= 0)
                throw new UserFriendlyException("Service price must be greater than zero.");

            var service = await _serviceRepository.GetAsync(serviceId);
            service.Price = newPrice;
            await _serviceRepository.UpdateAsync(service);

            return MapToEntityDto(service);
        }
    }
}
