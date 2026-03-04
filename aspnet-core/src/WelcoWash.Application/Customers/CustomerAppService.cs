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
using WelcoWash.Vehicles.Dto;

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
        private readonly IRepository<Customer, Guid> _customerRepository;
        private readonly IRepository<Vehicle, Guid> _vehicleRepository;


        public CustomerAppService(
            IRepository<Customer, Guid> cutomerRepository,
            IRepository<Vehicle, Guid> vehicleRepository)
            : base(cutomerRepository)
        {
            _customerRepository = cutomerRepository;
            _vehicleRepository = vehicleRepository;
        }
        
        public async Task<CustomerDto> AddVehicleAsync(Guid customerId, VehicleDto vehicle)
        {
            var customer = await Repository
                .GetAllIncluding(c => c.Vehicles)
                .FirstOrDefaultAsync(c => c.Id == customerId)
                ?? throw new EntityNotFoundException(typeof(Customer), customerId);

                
                var vehicleEntity = ObjectMapper.Map<Vehicle>(vehicle);

                vehicle.CustomerId = customerId;
                customer.Vehicles.Add(vehicleEntity);

                await _customerRepository.UpdateAsync(customer);

                return ObjectMapper.Map<CustomerDto>(customer);
        }
    }
}