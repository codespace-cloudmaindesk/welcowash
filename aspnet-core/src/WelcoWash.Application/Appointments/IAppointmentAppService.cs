using Abp.Application.Services;
using System;
using System.Threading.Tasks;
using WelcoWash.Appointments.Dto;

namespace WelcoWash.Appointments
{
    public interface IAppointmentAppService
        : IAsyncCrudAppService<AppointmentDto, Guid>
    {
        Task<AppointmentDto> ConfirmScheduledAppointmentAsync(Guid appointmentId);
        Task<AppointmentDto> RescheduleAppointmentAsync(Guid appointmentId, DateTime newScheduledTime);
        Task<AppointmentDto> CancelScheduledAppointmentAsync(Guid appointmentId, string reason);
        Task<AppointmentDto> MarkAppointmentAsCompletedAsync(Guid appointmentId);
        Task<AppointmentDto> RecordCustomerNoShowAsync(Guid appointmentId);

        Task<AppointmentDto> AssignServiceToAppointmentAsync(Guid appointmentId,Guid serviceOfferingId);
        Task<AppointmentDto> LinkVehicleToAppointmentAsync(Guid appointmentId,Guid vehicleId);
    }
}
