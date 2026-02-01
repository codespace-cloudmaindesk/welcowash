using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using WelcoWash.Domain.Employees;
using WelcoWash.Employees.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WelcoWash.Employees
{
    public class EmployeeAppService
        : AsyncCrudAppService<
            Employee, 
            EmployeeDto, 
            Guid, 
            PagedAndSortedResultRequestDto, 
            EmployeeDto, 
            EmployeeDto>,
          IEmployeeAppService
    {
        public EmployeeAppService(IRepository<Employee, Guid> employeeRepository)
            : base(employeeRepository)
        {
        }
    }
}