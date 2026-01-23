using Abp.Application.Services.Dto;
using System;
using WelcoWash.Domain.Appointments;

namespace WelcoWash.Appointments.Dto
{
    public class AppointmentDto: EntityDto<Guid>
    {
        #region Details
        public DateTime ScheduledTime { get; set; }
        public RefListAppointmentStatus Status { get; set; }
        public Guid ServiceId { get; set; }
        #endregion

        #region Relationships
        public Guid CustomerId { get; set; }
        public Guid VehicleId { get; set; }
        #endregion
    }
}
