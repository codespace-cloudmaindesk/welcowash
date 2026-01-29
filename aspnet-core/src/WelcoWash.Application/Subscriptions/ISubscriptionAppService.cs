using Abp.Application.Services;
using WelcoWash.Subscriptions.Dto;
using System;

namespace WelcoWash.Subscriptions
{
    public interface ISubscriptionAppService
        : IAsyncCrudAppService<SubscriptionDto, Guid>
    {
    }
}
