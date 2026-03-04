using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using WelcoWash.Domain.Appointments;
using WelcoWash.ServiceOfferings.Dto;

namespace WelcoWash.Appointments.Dto
{
    [AutoMap(typeof(Appointment))]
    public class AppointmentDto : EntityDto<Guid>
    {
        #region Appointment Details
        public Guid? CustomerId { get; set; }
        public Guid? VehicleId { get; set; }
        public ServiceOfferingDto? ServiceOffering { get; set; }
        public DateTime? ScheduledTime { get; set; }
        public RefListAppointmentStatus? Status { get; set; }
        #endregion
    }
}
