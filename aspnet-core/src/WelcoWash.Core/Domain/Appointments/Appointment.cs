using Abp.Domain.Entities.Auditing;
using System;

namespace WelcoWash.Domain.Appointments
{
    public class Appointment: FullAuditedEntity<Guid>
    {
        #region Details
        public DateTime ScheduledTime { get; set; }
        public RefListAppointmentStatus Status { get; set; }
        #endregion
    }
}
