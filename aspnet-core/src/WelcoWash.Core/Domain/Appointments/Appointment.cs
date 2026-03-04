using Abp.Domain.Entities.Auditing;
using System;
using WelcoWash.Domain.ServiceOfferings;

namespace WelcoWash.Domain.Appointments
{
    public class Appointment: FullAuditedEntity<Guid>
    {
        #region Details
        public Guid CustomerId { get; set; }
        public Guid VehicleId { get; set; }
        public Guid ServiceOfferingId { get; set; }
        public ServiceOffering ServiceOffering { get; set; }
        public DateTime ScheduledTime { get; set; }
        public RefListAppointmentStatus Status { get; set; }
        public bool IsSubscriptionUsed { get; set; }
        public string Notes { get; set; }
        public double TotalPrice { get; set; }
        #endregion
    }
}