using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WelcoWash.Customers.Dto;

namespace WelcoWash.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService<CustomerDto, Guid>
    {
        Task<List<CustomerDto>> GetActiveCustomersAsync();
    }
}
