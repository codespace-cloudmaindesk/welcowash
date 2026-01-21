using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Net;
using System.Collections.Generic;
using System.Threading.Tasks;
using WelcoWash.Customers.Dto;
using WelcoWash.Domain.Customers;

namespace WelcoWash.Customers
{
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, Guid, PagedAndSortedResultRequestDto, CustomerDto, CustomerDto>, ICustomerAppService
    {
        private readonly IRepository<Customer, Guid> _repository;
        public CustomerAppService(IRepository<Customer, Guid> repository)
            : base(repository)
        {
            _repository = repository;
        }

        public async override Task<CustomerDto> CreateAsync(CustomerDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException("Address data cannot be null.", Abp.Logging.LogSeverity.Warn);
                }

                var address = ObjectMapper.Map<Customer>(input);
                var result = await _repository.InsertAsync(address);
                return ObjectMapper.Map<CustomerDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating customer", ex);
                throw new UserFriendlyException($"Could not create Customer. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async Task<List<CustomerDto>> GetActiveCustomersAsync()
        {
            var customers = await _repository.GetAllListAsync();
            var customerDtos = ObjectMapper.Map<List<CustomerDto>>(customers);
            return customerDtos;

        }
    }
}
