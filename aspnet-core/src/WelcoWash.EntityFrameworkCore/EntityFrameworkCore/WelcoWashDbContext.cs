using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using WelcoWash.Authorization.Roles;
using WelcoWash.Authorization.Users;
using WelcoWash.MultiTenancy;
using WelcoWash.Domain.Customers;
using WelcoWash.Domain.Employees;
using WelcoWash.Domain.Vehicles;
using WelcoWash.Domain.Appointments;

namespace WelcoWash.EntityFrameworkCore
{
    public class WelcoWashDbContext : AbpZeroDbContext<Tenant, Role, User, WelcoWashDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

        public WelcoWashDbContext(DbContextOptions<WelcoWashDbContext> options)
            : base(options)
        {
        }
    }
}
