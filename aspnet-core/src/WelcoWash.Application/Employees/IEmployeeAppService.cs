using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WelcoWash.Domain.Employees;
using WelcoWash.Employees.Dto;

namespace WelcoWash.Employees
{
    public interface IEmployeeAppService : IAsyncCrudAppService<EmployeeDto, Guid>
    {
        Task<List<EmployeeDto>> GetEmployeeByStatusAsync( RefListEmploymentStatus status);
    }
}
