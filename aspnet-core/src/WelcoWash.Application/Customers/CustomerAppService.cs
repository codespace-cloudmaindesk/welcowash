using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Entities;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
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

        private static void ValidateVehicleLink(Customer customer, Vehicle vehicle)
        {
             customer.Vehicles ??= new List<Vehicle>();

            if (vehicle.CustomerId != Guid.Empty && vehicle.CustomerId != customer.Id)
            {
                throw new UserFriendlyException("Vehicle already linked to another customer.");
            }

            if (customer.Vehicles.Any(v => v.Id == vehicle.Id))
            {
                throw new UserFriendlyException("Vehicle already linked to this customer.");
            }
        }
        
        public async Task<CustomerDto> AddVehicleAsync(Guid customerId, Guid vehicleId)
        {
            var customer = await Repository
                .GetAllIncluding(c => c.Vehicles)
                .FirstOrDefaultAsync(c => c.Id == customerId)
                ?? throw new EntityNotFoundException(typeof(Customer), customerId);

                var vehicle = await _vehicleRepository.GetAsync(vehicleId);

                ValidateVehicleLink(customer, vehicle);

                vehicle.CustomerId = customerId;
                customer.Vehicles.Add(vehicle);

                await Repository.UpdateAsync(customer);

                var dto = MapToEntityDto(customer);
                dto.VehicleIds = customer.Vehicles.Select(v => v.Id).ToList();
                return dto;
        }
    }
}