using Abp.Domain.Entities;
using System;

namespace WelcoWash.Domain.Vehicles
{
    public class Vehicle : Entity<Guid>
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public int Year { get; set; }
        public string LicensePlate { get; set; }
        public Guid CustomerId { get; set; }
    }
}