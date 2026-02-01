using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Entities;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using WelcoWash.Domain.Customers;
using WelcoWash.Domain.Vehicles;
using WelcoWash.Customers.Dto;

namespace WelcoWash.Customers
{
    public class CustomerAppService
        : AsyncCrudAppService<
            Customer,
            CustomerDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CustomerDto,
            CustomerDto>,
          ICustomerAppService
    {
        private readonly IRepository<Vehicle, Guid> _vehicleRepository;

        public CustomerAppService(
            IRepository<Customer, Guid> repository,
            IRepository<Vehicle, Guid> vehicleRepository)
            : base(repository)
        {
            _vehicleRepository = vehicleRepository;
        }
        
        public async Task<CustomerDto> AddVehicleAsync(Guid customerId, Guid vehicleId)
        {
            var customer = await Repository
                .GetAllIncluding(c => c.Vehicles)
                .FirstOrDefaultAsync(c => c.Id == customerId);

            if (customer == null)
            {
                throw new EntityNotFoundException(typeof(Customer), customerId);
            }

            var vehicle = await _vehicleRepository.FirstOrDefaultAsync(vehicleId);
            if (vehicle == null)
            {
                throw new UserFriendlyException("Vehicle does not exist.");
            }

            customer.Vehicles ??= new System.Collections.Generic.List<Vehicle>();

            if (customer.Vehicles.Any(v => v.Id == vehicleId))
            {
                throw new UserFriendlyException("Vehicle already linked to this customer.");
            }

            customer.Vehicles.Add(vehicle);

            await Repository.UpdateAsync(customer);

            var dto = MapToEntityDto(customer);
            dto.VehicleIds = customer.Vehicles.Select(v => v.Id).ToList();

            return dto;
        }
    }
}