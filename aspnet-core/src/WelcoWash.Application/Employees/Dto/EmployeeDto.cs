using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using System;

namespace WelcoWash.Employees.Dto
{
    public class EmployeeDto: EntityDto<Guid>
    {
        #region Details
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        #endregion

        #region Business State
        public bool IsActive { get; set; }
        #endregion
    }
}
