using Abp.Application.Services;
using WelcoWash.Vehicles.Dto;
using System;

namespace WelcoWash.Vehicles
{
    public interface IVehicleAppService
        : IAsyncCrudAppService<VehicleDto, Guid>
    {
    }
}
