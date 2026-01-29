using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using WelcoWash.Domain.Subscriptions;
using WelcoWash.ServiceOfferings.Dto;

namespace WelcoWash.Subscriptions.Dto
{
    [AutoMap(typeof(Subscription))]
    public class SubscriptionDto : EntityDto<Guid>
    {
        #region Subscription Details
        public ReferenceListSubscriptionType? Name { get; set; }
        public double? Price { get; set; }
        public TimeSpan? Duration { get; set; }
        public ICollection<ServiceOfferingDto>? IncludedServices { get; set; }
        public string? Description { get; set; }
        #endregion
    }
}
