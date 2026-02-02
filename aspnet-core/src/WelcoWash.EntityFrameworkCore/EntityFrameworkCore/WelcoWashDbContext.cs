using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WelcoWash.Authorization.Roles;
using WelcoWash.Authorization.Users;
using WelcoWash.Domain.Appointments;
using WelcoWash.Domain.Customers;
using WelcoWash.Domain.Employees;
using WelcoWash.Domain.ServiceOfferings;
using WelcoWash.Domain.Subscriptions;
using WelcoWash.Domain.Vehicles;
using WelcoWash.MultiTenancy;

namespace WelcoWash.EntityFrameworkCore
{
    public class WelcoWashDbContext : AbpZeroDbContext<Tenant, Role, User, WelcoWashDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<ServiceOffering> ServiceOfferings { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }  
        public DbSet<Vehicle> Vehicles { get; set; }


        public WelcoWashDbContext(DbContextOptions<WelcoWashDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Appointment>()
                   .Property(a => a.Status)
                   .HasConversion<int>();

            builder.Entity<ServiceOffering>()
                   .Property(s => s.Name)
                   .HasConversion<int>();

            builder.Entity<Subscription>()
                   .Property(s => s.Name)
                   .HasConversion<int>();

            builder.Entity<Customer>()
                   .HasIndex(c => c.Email)
                   .IsUnique();

            builder.Entity<Vehicle>()
                   .HasIndex(v => v.LicensePlate)
                   .IsUnique();

            builder.Entity<Appointment>()
                   .HasIndex(a => a.ScheduledTime);

            builder.Entity<Appointment>()
                   .HasOne(a => a.ServiceOffering)
                   .WithMany()
                   .HasForeignKey(a => a.ServiceOfferingId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
