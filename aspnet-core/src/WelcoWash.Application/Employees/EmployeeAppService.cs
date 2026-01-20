using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Net;
using System.Threading.Tasks;
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
    }
}
