using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using WelcoWash.Domain.Customers;
using WelcoWash.Domain.Vehicles;
using WelcoWash.Vehicles.Dto;

namespace WelcoWash.Customers.Dto
{
    [AutoMap(typeof(Customer))]
    public class CustomerDto : EntityDto<Guid>
    {
        #region Details
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        #endregion

        #region Navigation
        public ICollection<VehicleDto> Vehicles { get; set; }
        public ICollection<Guid> VehicleIds { get; set; }

        public long UserId { get; set; }
        #endregion
    }
}
