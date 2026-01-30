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
        : AsyncCrudAppService<Employee, EmployeeDto, Guid, PagedAndSortedResultRequestDto, EmployeeDto, EmployeeDto>,
          IEmployeeAppService
    {
        private readonly IRepository<Employee, Guid> _employeeRepository;

        public EmployeeAppService(IRepository<Employee, Guid> employeeRepository)
            : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public override async Task<EmployeeDto> CreateAsync(EmployeeDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Employee data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = ObjectMapper.Map<Employee>(input);
                var result = await _employeeRepository.InsertAsync(entity);

                return ObjectMapper.Map<EmployeeDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating Employee", ex);
                throw new UserFriendlyException(
                    $"Could not create Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<PagedResultDto<EmployeeDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                query = ApplySorting(query, input);
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var items = await AsyncQueryableExecuter.ToListAsync(
                    query.Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                return new PagedResultDto<EmployeeDto>(
                    totalCount,
                    ObjectMapper.Map<List<EmployeeDto>>(items)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving Employees", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Employees. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<EmployeeDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Employee ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _employeeRepository.GetAsync(input.Id);

                if (entity == null)
                {
                    throw new UserFriendlyException(
                        "Employee not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<EmployeeDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving Employee with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<EmployeeDto> UpdateAsync(EmployeeDto input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Employee data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _employeeRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, entity);

                var updated = await _employeeRepository.UpdateAsync(entity);
                return ObjectMapper.Map<EmployeeDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating Employee with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task DeleteAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Employee ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _employeeRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting Employee with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}
