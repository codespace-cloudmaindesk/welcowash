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

        public override async Task<EmployeeDto> CreateAsync(EmployeeDto input)
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

        public async Task<List<EmployeeDto>> GetEmployeeByStatusAsync( RefListEmploymentStatus status)
        {
            try
            {
                var employees = await _repository.GetAll()
                    .Where(e => e.EmploymentStatus == status)
                    .ToListAsync();

                return ObjectMapper.Map<List<EmployeeDto>>(employees);
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving employees with status {status}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve employees with status {status}. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}
