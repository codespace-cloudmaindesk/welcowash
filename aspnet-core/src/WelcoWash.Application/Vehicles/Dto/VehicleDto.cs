using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using WelcoWash.Domain.Vehicles;
using System;

namespace WelcoWash.Vehicles.Dto
{
    [AutoMap(typeof(Vehicle))]
    public class VehicleDto : EntityDto<Guid>
    {
        #region Vehicle Details
        public string? Make { get; set; }
        public string? Model { get; set; }
        public string? Color { get; set; }
        public int? Year { get; set; }
        public string? LicensePlate { get; set; }
        public Guid? CustomerId { get; set; }
        #endregion
    }
}
