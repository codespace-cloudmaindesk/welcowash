using Abp.Application.Services;
using System;
using System.Threading.Tasks;
using WelcoWash.Appointments.Dto;

namespace WelcoWash.Appointments
{
    public interface IAppointmentAppService
        : IAsyncCrudAppService<AppointmentDto, Guid>
    {
        Task<AppointmentDto> ConfirmAsync(Guid appointmentId);
        Task<AppointmentDto> ScheduleAsync(Guid appointmentId, DateTime newScheduledTime);
        Task<AppointmentDto> CancelAsync(Guid appointmentId, string reason);
        Task<AppointmentDto> CompleteAsync(Guid appointmentId);
        Task<AppointmentDto> MarkAsNoShowAsync(Guid appointmentId);

        Task<AppointmentDto> AssignServiceAsync(Guid appointmentId,Guid serviceOfferingId);
        Task<AppointmentDto> LinkVehicleAsync(Guid appointmentId,Guid vehicleId);
    }
}