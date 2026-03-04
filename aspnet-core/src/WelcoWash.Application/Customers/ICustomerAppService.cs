using Abp.Application.Services;
using WelcoWash.Customers.Dto;
using System;
using System.Threading.Tasks;
using WelcoWash.Vehicles.Dto;

namespace WelcoWash.Customers
{
    public interface ICustomerAppService
        : IAsyncCrudAppService<CustomerDto, Guid>
    {
        Task<CustomerDto> AddVehicleAsync(Guid customerId, VehicleDto vehicle);
    }
}
