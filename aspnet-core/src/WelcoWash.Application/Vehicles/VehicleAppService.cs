using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using WelcoWash.Domain.Vehicles;
using WelcoWash.Vehicles.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WelcoWash.Vehicles
{
    public class VehicleAppService
        : AsyncCrudAppService<
            Vehicle,
            VehicleDto,
            Guid,
            PagedAndSortedResultRequestDto,
            VehicleDto,
            VehicleDto>,
          IVehicleAppService
    {
        public VehicleAppService(IRepository<Vehicle, Guid> repository)
            : base(repository)
        {
        }
        public async Task<List<VehicleDto>> GetByCustomerAsync(Guid customerId)
        {
            var vehicles = await Repository.GetAllListAsync(v => v.CustomerId == customerId);
            return vehicles.Select(MapToEntityDto).ToList();
        }
    }
}