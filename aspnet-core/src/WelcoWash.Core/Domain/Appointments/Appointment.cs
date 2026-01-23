using Abp.Domain.Entities.Auditing;
using System;
using WelcoWash.Domain.Services;


namespace WelcoWash.Domain.Appointments
{
    public class Appointment: FullAuditedEntity<Guid>
    {
        #region Details
        public DateTime ScheduledTime { get; set; }
        public RefListAppointmentStatus Status { get; set; }
        public Service Service { get; set; }
        #endregion

        #region Relationships
        public Guid CustomerId { get; set; }
        public Guid VehicleId { get; set; }
        #endregion
    }
}
