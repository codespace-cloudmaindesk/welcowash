using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WelcoWash.Employees.Dto;

namespace WelcoWash.Employees
{
    public interface IEmployeeAppService : IAsyncCrudAppService<EmployeeDto, Guid>
    {
        Task<List<EmployeeDto>> GetActiveEmployeesAsync();
    }
}
