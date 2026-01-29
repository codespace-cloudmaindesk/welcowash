using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using WelcoWash.Domain.Employees;
using System;

namespace WelcoWash.Employees.Dto
{
    [AutoMap(typeof(Employee))]
    public class EmployeeDto : EntityDto<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public long UserId { get; set; }
    }
}
