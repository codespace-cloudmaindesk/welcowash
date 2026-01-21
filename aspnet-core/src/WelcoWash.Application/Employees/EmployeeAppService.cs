using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Microsoft.EntityFrameworkCore;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Net;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using WelcoWash.Domain.Employees;
using WelcoWash.Employees.Dto;

namespace WelcoWash.Employees
{
    public class EmployeeAppService : AsyncCrudAppService<Employee, EmployeeDto, Guid, PagedAndSortedResultRequestDto, EmployeeDto, EmployeeDto>, IEmployeeAppService
    {
        private readonly IRepository<Employee, Guid> _repository;
        public EmployeeAppService(IRepository<Employee, Guid> repository)
            : base(repository)
        {
            _repository = repository;
        }

        public async override Task<EmployeeDto> CreateAsync(EmployeeDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException("Employee data cannot be null.", Abp.Logging.LogSeverity.Warn);
                }

                var address = ObjectMapper.Map<Employee>(input);
                var result = await _repository.InsertAsync(address);
                return ObjectMapper.Map<EmployeeDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating employee", ex);
                throw new UserFriendlyException($"Could not create Employee. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async Task<List<EmployeeDto>> GetActiveEmployeeAsync()
        {
            try
            {
                var activeEmployees = await _repository.GetAll().Where(e => e.IsActive).ToListAsync();
                return ObjectMapper.Map<List<EmployeeDto>>(activeEmployees);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving active employees", ex);
                throw new UserFriendlyException($"Could not retrieve active employees. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }
    }
}
