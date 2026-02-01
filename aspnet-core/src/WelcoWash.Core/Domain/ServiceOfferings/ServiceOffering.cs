using Abp.Domain.Entities;
using System;

namespace WelcoWash.Domain.ServiceOfferings
{
    public class ServiceOffering : Entity<Guid>
    {
        public ReferenceListServiceName Name { get; set; }
        public string Description { get; set; }
        public int DurationInMinutes { get; set; }
        public double Price { get; set; }
        public bool IsAvailable { get; set; }
    }
}