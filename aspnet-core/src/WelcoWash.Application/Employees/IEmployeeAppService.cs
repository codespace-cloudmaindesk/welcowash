using Abp.Application.Services;
using WelcoWash.Employees.Dto;
using System;
using System.Threading.Tasks;

namespace WelcoWash.Employees
{
    public interface IEmployeeAppService
        : IAsyncCrudAppService<EmployeeDto, Guid>
    {
    }
}
