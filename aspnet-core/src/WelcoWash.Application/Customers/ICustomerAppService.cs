using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WelcoWash.Customers.Dto;
using WelcoWash.Domain.Customers;

namespace WelcoWash.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService<CustomerDto, Guid>
    {
        Task<List<CustomerDto>> GetCustomerByStatusAsync( RefListCustomerStatus status);
    }
}
