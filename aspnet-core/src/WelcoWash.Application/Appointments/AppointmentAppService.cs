using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Threading.Tasks;
using WelcoWash.Domain.Appointments;
using WelcoWash.Domain.ServiceOfferings;
using WelcoWash.Domain.Vehicles;
using WelcoWash.Appointments.Dto;
using Microsoft.EntityFrameworkCore;

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
        private readonly IRepository<Vehicle, Guid> _vehicleRepository;

        public AppointmentAppService(
            IRepository<Appointment, Guid> repository,
            IRepository<ServiceOffering, Guid> serviceOfferingRepository,
            IRepository<Vehicle, Guid> vehicleRepository)
            : base(repository)
        {
            _serviceOfferingRepository = serviceOfferingRepository;
            _vehicleRepository = vehicleRepository;
        }

        private async Task<AppointmentDto> ChangeStatusAsync(
            Guid appointmentId,
            RefListAppointmentStatus newStatus)
        {
            var appointment = await Repository.GetAsync(appointmentId);

            AppointmentStatusRules.Validate(appointment.Status, newStatus);

            appointment.Status = newStatus;
            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }

        public Task<AppointmentDto> StartAsync(Guid appointmentId) =>
            ChangeStatusAsync(
                appointmentId,
                RefListAppointmentStatus.InProgress
            );
    
        public Task<AppointmentDto> ConfirmAsync(Guid appointmentId) => 
            ChangeStatusAsync(
                appointmentId,
                RefListAppointmentStatus.Confirmed
            );

        public Task<AppointmentDto> CompleteAsync(Guid appointmentId) =>
            ChangeStatusAsync(
                appointmentId,
                RefListAppointmentStatus.Completed
            );

        public Task<AppointmentDto> MarkAsNoShowAsync(Guid appointmentId) =>
            ChangeStatusAsync(
                appointmentId,
                RefListAppointmentStatus.NoShow
            );

        public async Task<AppointmentDto> ScheduleAsync(
            Guid appointmentId,
            DateTime newScheduledTime)
        {
            var appointment = await Repository.GetAsync(appointmentId);

            if (appointment.Status is
                RefListAppointmentStatus.Completed or
                RefListAppointmentStatus.Cancelled or
                RefListAppointmentStatus.NoShow)
            {
                throw new UserFriendlyException(
                    $"Appointment cannot be rescheduled when status is {appointment.Status}.");
            }

            appointment.ScheduledTime = newScheduledTime;

            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }

        public async Task<AppointmentDto> CancelAsync(
            Guid appointmentId,
            string reason)
        {
            if (string.IsNullOrWhiteSpace(reason))
                throw new UserFriendlyException("A cancellation reason is required.");
            
            var appointment = await Repository.GetAsync(appointmentId);

            AppointmentStatusRules.Validate(
                appointment.Status,
                RefListAppointmentStatus.Cancelled);

            appointment.Notes = string.IsNullOrEmpty(appointment.Notes) 
                ? $"Cancellation Reason: {reason}" 
                : $"{appointment.Notes} | Cancellation Reason: {reason}";

            appointment.Status = RefListAppointmentStatus.Cancelled;

            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }

        [RemoteService(IsEnabled = false)]
        public Task<AppointmentDto> CancelAsync(Guid appointmentId)
        {
            return CancelAsync(appointmentId, "Cancelled without reason provided");
        }

        public async Task<AppointmentDto> AssignServiceAsync(
            Guid appointmentId,
            Guid serviceOfferingId)
        {
            if (serviceOfferingId == Guid.Empty)
                throw new UserFriendlyException("Invalid service offering ID.");
            
            var appointment = await Repository.GetAsync(appointmentId);

            if (!AppointmentStatusRules.CanTransitionTo(
                    appointment.Status,
                    RefListAppointmentStatus.Confirmed) &&
                appointment.Status != RefListAppointmentStatus.Pending)
            {
                throw new UserFriendlyException(
                    $"Service cannot be assigned when appointment status is {appointment.Status}.");
            }

            if (!await _serviceOfferingRepository.GetAll()
                    .AnyAsync(s => s.Id == serviceOfferingId))
            {
                throw new UserFriendlyException("Service offering not found.");
            }
            appointment.ServiceOfferingId = serviceOfferingId;

            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }

        public async Task<AppointmentDto> LinkVehicleAsync(
            Guid appointmentId,
            Guid vehicleId)
        {
            if (vehicleId == Guid.Empty)
                throw new UserFriendlyException("Invalid vehicle ID.");
        
            var appointment = await Repository.GetAsync(appointmentId);

            if (!await _vehicleRepository.GetAll().AnyAsync(v => v.Id == vehicleId))
                throw new UserFriendlyException("Vehicle not found.");

            if (!AppointmentStatusRules.CanTransitionTo(
                    appointment.Status,
                    RefListAppointmentStatus.Confirmed) &&
                appointment.Status != RefListAppointmentStatus.Pending)
            {
                throw new UserFriendlyException(
                    $"Vehicle cannot be linked when appointment status is {appointment.Status}.");
            }

            appointment.VehicleId = vehicleId;

            await Repository.UpdateAsync(appointment);

            return MapToEntityDto(appointment);
        }
    }
}