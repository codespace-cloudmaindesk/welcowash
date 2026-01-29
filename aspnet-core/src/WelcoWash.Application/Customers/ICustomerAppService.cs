using Abp.Application.Services;
using WelcoWash.Customers.Dto;
using System;

namespace WelcoWash.Customers
{
    public interface ICustomerAppService
        : IAsyncCrudAppService<CustomerDto, Guid>
    {
    }
}
