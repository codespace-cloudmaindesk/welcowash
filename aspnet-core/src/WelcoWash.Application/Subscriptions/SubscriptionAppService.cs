using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WelcoWash.Domain.Subscriptions;
using WelcoWash.Domain.ServiceOfferings;
using WelcoWash.Subscriptions.Dto;
using WelcoWash.ServiceOfferings.Dto;

namespace WelcoWash.Subscriptions
{
    public class SubscriptionAppService
        : AsyncCrudAppService<
            Subscription,
            SubscriptionDto,
            Guid,
            PagedAndSortedResultRequestDto,
            SubscriptionDto,
            SubscriptionDto>,
          ISubscriptionAppService
    {
        private readonly IRepository<ServiceOffering, Guid> _serviceOfferingRepository;

        public SubscriptionAppService(
            IRepository<Subscription, Guid> subscriptionRepository,
            IRepository<ServiceOffering, Guid> serviceOfferingRepository)
            : base(subscriptionRepository)
        {
            _serviceOfferingRepository = serviceOfferingRepository;
        }

        private static List<Guid> ValidateServiceIds(ICollection<Guid> serviceOfferingIds)
        {
            if (serviceOfferingIds == null)
                throw new UserFriendlyException("At least one service offering must be included.");

            var distinctIds = serviceOfferingIds
                .Where(id => id != Guid.Empty)
                .Distinct()
                .ToList();

            if (!distinctIds.Any())
                throw new UserFriendlyException("At least one service offering must be included.");

            return distinctIds;
        }

        public async Task<SubscriptionDto> UpdatePriceAsync(Guid subscriptionId, double newPrice)
        {
            if (newPrice <= 0)
                throw new UserFriendlyException("Subscription price must be greater than zero.");

            var subscription = await Repository.GetAsync(subscriptionId);
            subscription.Price = newPrice;

            await Repository.UpdateAsync(subscription);

            return MapToEntityDto(subscription);
        }

        public async Task<SubscriptionDto> UpdatePackageAsync(
            Guid subscriptionId,
            ICollection<Guid> serviceOfferingIds)
        {
            var distinctIds = ValidateServiceIds(serviceOfferingIds);

            var subscription = await Repository.GetAsync(subscriptionId);

            var services = await _serviceOfferingRepository.GetAllListAsync(
                s => distinctIds.Contains(s.Id)
            );

            if (services.Count != distinctIds.Count)
                throw new UserFriendlyException("One or more service offerings were not found.");

            subscription.IncludedServices = services;

            await Repository.UpdateAsync(subscription);

            return MapToEntityDto(subscription);
        }
    }
}