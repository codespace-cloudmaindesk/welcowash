using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;
using System;
using WelcoWash.Domain.Appointments;
using WelcoWash.Domain.Services;

namespace WelcoWash.Appointments.Dto
{
    public class AppointmentDto: EntityDto<Guid>
    {
        #region Details
        public DateTime ScheduledTime { get; set; }
        public RefListAppointmentStatus Status { get; set; }
        public Service Service { get; set; }
        #endregion

        #region Relationships
        [Required]
        public Guid? CustomerId { get; set; }
        [Required]
        public Guid? VehicleId { get; set; }
        #endregion
    }
}
