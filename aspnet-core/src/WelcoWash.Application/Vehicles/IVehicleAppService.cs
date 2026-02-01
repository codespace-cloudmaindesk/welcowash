using Abp.Application.Services;
using WelcoWash.Vehicles.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WelcoWash.Vehicles
{
    public interface IVehicleAppService
        : IAsyncCrudAppService<VehicleDto, Guid>
    {
        Task<List<VehicleDto>> GetByCustomerAsync(Guid customerId);
    }
}
