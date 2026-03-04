using Abp.Application.Services;
using WelcoWash.Subscriptions.Dto;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace WelcoWash.Subscriptions
{
    public interface ISubscriptionAppService
        : IAsyncCrudAppService<SubscriptionDto, Guid>
    {
        Task<SubscriptionDto> UpdatePriceAsync(Guid subscriptionId, double newPrice);
        Task<SubscriptionDto> UpdatePackageAsync(Guid subscriptionId, ICollection<Guid> serviceOfferingIds);
    }
}

