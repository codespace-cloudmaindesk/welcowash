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
        #endregion
    }
}
