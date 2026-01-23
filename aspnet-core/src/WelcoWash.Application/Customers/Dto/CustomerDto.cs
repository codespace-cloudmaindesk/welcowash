using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using WelcoWash.Domain.Customers;

namespace WelcoWash.Customers.Dto
{
    [AutoMap(typeof(Customer))]
    public class CustomerDto : EntityDto<Guid>
    {
        #region Personal Information
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        #endregion

        #region Account Information
        public DateOnly? AccountStartDate { get; set; }
        public DateOnly? AccountClosureDate { get; set; }
        public RefListCustomerStatus? CustomerStatus { get; set; }
        #endregion

        #region Navigation
        public long? UserId { get; set; }
        #endregion
    }
}
