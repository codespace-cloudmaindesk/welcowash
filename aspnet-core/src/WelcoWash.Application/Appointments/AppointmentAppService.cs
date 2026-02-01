using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Threading.Tasks;
using WelcoWash.Domain.Appointments;
using WelcoWash.Domain.ServiceOfferings;
using WelcoWash.Appointments.Dto;

namespace WelcoWash.Appointments
{
    public class AppointmentAppService
        : AsyncCrudAppService<
            Appointment,
            AppointmentDto,
            Guid,
            PagedAndSortedResultRequestDto,
            AppointmentDto,
            AppointmentDto>,
          IAppointmentAppService
    {
        private readonly IRepository<ServiceOffering, Guid> _serviceOfferingRepository;

        public AppointmentAppService(
            IRepository<Appointment, Guid> repository,
            IRepository<ServiceOffering, Guid> serviceOfferingRepository)
            : base(repository)
        {
            _serviceOfferingRepository = serviceOfferingRepository;
        }

        private async Task<AppointmentDto> ChangeStatusAsync(
            Guid appointmentId,
            RefListAppointmentStatus newStatus,
            RefListAppointmentStatus requiredCurrentStatus)
        {
            var appointment = await Repository.GetAsync(appointmentId);

            if (appointment.Status != requiredCurrentStatus)
            {
                throw new UserFriendlyException(
                    $"Cannot change status from {appointment.Status} to {newStatus}."
                );
            }

            appointment.Status = newStatus;

            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }

        public Task<AppointmentDto> ConfirmAsync(Guid appointmentId) =>
            ChangeStatusAsync(
                appointmentId,
                RefListAppointmentStatus.Confirmed,
                RefListAppointmentStatus.Pending);

        public Task<AppointmentDto> CompleteAsync(Guid appointmentId) =>
            ChangeStatusAsync(
                appointmentId,
                RefListAppointmentStatus.Completed,
                RefListAppointmentStatus.InProgress);

        public Task<AppointmentDto> MarkAsNoShowAsync(Guid appointmentId) =>
            ChangeStatusAsync(
                appointmentId,
                RefListAppointmentStatus.NoShow,
                RefListAppointmentStatus.Confirmed);

        public async Task<AppointmentDto> ScheduleAsync(
            Guid appointmentId,
            DateTime newScheduledTime)
        {
            var appointment = await Repository.GetAsync(appointmentId);

            if (appointment.Status is
                RefListAppointmentStatus.Completed or
                RefListAppointmentStatus.Cancelled)
            {
                throw new UserFriendlyException(
                    $"Appointment cannot be rescheduled when status is {appointment.Status}."
                );
            }

            appointment.ScheduledTime = newScheduledTime;

            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }

        public async Task<AppointmentDto> CancelAsync(
            Guid appointmentId,
            string reason)
        {
            var appointment = await Repository.GetAsync(appointmentId);

            if (appointment.Status == RefListAppointmentStatus.Completed)
            {
                throw new UserFriendlyException(
                    "Completed appointments cannot be cancelled."
                );
            }

            appointment.Status = RefListAppointmentStatus.Cancelled;
            appointment.Notes = string.IsNullOrWhiteSpace(appointment.Notes)
                ? $"Cancelled: {reason}"
                : $"{appointment.Notes}\nCancelled: {reason}";

            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }

        public async Task<AppointmentDto> AssignServiceAsync(
            Guid appointmentId,
            Guid serviceOfferingId)
        {
            var appointment = await Repository.GetAsync(appointmentId);
            var serviceOffering =
                await _serviceOfferingRepository.GetAsync(serviceOfferingId);

            appointment.ServiceOffering = serviceOffering;

            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }

        public async Task<AppointmentDto> LinkVehicleAsync(
            Guid appointmentId,
            Guid vehicleId)
        {
            var appointment = await Repository.GetAsync(appointmentId);
            appointment.VehicleId = vehicleId;

            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }
    }
}