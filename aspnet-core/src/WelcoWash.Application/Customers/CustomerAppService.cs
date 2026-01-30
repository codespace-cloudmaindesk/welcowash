using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using WelcoWash.Domain.Customers;
using WelcoWash.Customers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WelcoWash.Customers
{
    public class CustomerAppService
        : AsyncCrudAppService<Customer, CustomerDto, Guid, PagedAndSortedResultRequestDto, CustomerDto, CustomerDto>,
          ICustomerAppService
    {
        private readonly IRepository<Customer, Guid> _customerRepository;

        public CustomerAppService(IRepository<Customer, Guid> customerRepository)
            : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public override async Task<CustomerDto> CreateAsync(CustomerDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Customer data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = ObjectMapper.Map<Customer>(input);
                var result = await _customerRepository.InsertAsync(entity);

                return ObjectMapper.Map<CustomerDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating Customer", ex);
                throw new UserFriendlyException(
                    $"Could not create Customer. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<PagedResultDto<CustomerDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
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

                return new PagedResultDto<CustomerDto>(
                    totalCount,
                    ObjectMapper.Map<List<CustomerDto>>(items)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving Customers", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Customers. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<CustomerDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Customer ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _customerRepository.GetAsync(input.Id);

                if (entity == null)
                {
                    throw new UserFriendlyException(
                        "Customer not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<CustomerDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving Customer with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Customer. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<CustomerDto> UpdateAsync(CustomerDto input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Customer data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _customerRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, entity);

                var updated = await _customerRepository.UpdateAsync(entity);
                return ObjectMapper.Map<CustomerDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating Customer with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update Customer. Error: {ex.Message}",
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
                        "Invalid Customer ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _customerRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting Customer with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete Customer. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}
