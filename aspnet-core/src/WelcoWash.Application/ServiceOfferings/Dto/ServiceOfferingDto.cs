using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using WelcoWash.Domain.ServiceOfferings;
using System;

namespace WelcoWash.ServiceOfferings.Dto
{
    [AutoMap(typeof(ServiceOffering))]
    public class ServiceOfferingDto : EntityDto<Guid>
    {
        #region Service Offering Details
        public ReferenceListServiceName? Name { get; set; }
        public string? Description { get; set; }
        public int? DurationInMinutes { get; set; }
        public double? Price { get; set; }
        public bool? IsAvailable { get; set; }
        #endregion
    }
}
