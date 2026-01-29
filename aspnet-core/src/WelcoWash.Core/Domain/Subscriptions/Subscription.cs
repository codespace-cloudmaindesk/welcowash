using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using WelcoWash.Domain.ServiceOfferings;

namespace WelcoWash.Domain.Subscriptions
{
    public class Subscription : Entity<Guid>
    {
        public ReferenceListSubscriptionType Name { get; set; }
        public double Price { get; set; }
        public TimeSpan Duration { get; set; }
        public ICollection<ServiceOffering> IncludedServices { get; set; }
        public string Description { get; set; }
    }
}
