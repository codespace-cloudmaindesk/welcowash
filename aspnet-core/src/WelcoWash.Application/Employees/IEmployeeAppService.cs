using Abp.Application.Services;
using System;
using WelcoWash.Employees.Dto;

namespace WelcoWash.Employees
{
    public interface IEmployeeAppService : IAsyncCrudAppService<EmployeeDto, Guid>
    {
    }
}
