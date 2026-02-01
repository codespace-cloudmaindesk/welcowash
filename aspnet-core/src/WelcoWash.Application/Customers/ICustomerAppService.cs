using Abp.Application.Services;
using WelcoWash.Customers.Dto;
using System;
using System.Threading.Tasks;

namespace WelcoWash.Customers
{
    public interface ICustomerAppService
        : IAsyncCrudAppService<CustomerDto, Guid>
    {
        Task<CustomerDto> AddVehicleAsync(Guid customerId, Guid vehicleId);
    }
}
