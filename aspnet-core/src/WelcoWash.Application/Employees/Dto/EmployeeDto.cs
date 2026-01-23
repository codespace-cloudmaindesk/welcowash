using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using System;

namespace WelcoWash.Employees.Dto
{
    public class EmployeeDto: EntityDto<Guid>
    {
        #region Personal Information
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        #endregion
 

        #region Employment Information
        public DateOnly? EmploymentStartDate{ get; set; }
        public DateOnly? EmploymentEndDate { get; set; }
        #endregion
    }
}
