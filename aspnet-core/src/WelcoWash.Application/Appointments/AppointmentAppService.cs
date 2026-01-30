using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using WelcoWash.Domain.Appointments;
using WelcoWash.Domain.ServiceOfferings;
using WelcoWash.Appointments.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WelcoWash.Appointments
{
    public class AppointmentAppService
        : AsyncCrudAppService<Appointment, AppointmentDto, Guid, PagedAndSortedResultRequestDto, AppointmentDto, AppointmentDto>,
          IAppointmentAppService
    {
        private readonly IRepository<Appointment, Guid> _appointmentRepository;
        private readonly IRepository<ServiceOffering, Guid> _serviceOfferingRepository;

        public AppointmentAppService(
            IRepository<Appointment, Guid> appointmentRepository,
            IRepository<ServiceOffering, Guid> serviceOfferingRepository)
            : base(appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
            _serviceOfferingRepository = serviceOfferingRepository;
        }

        private async Task<Appointment> GetAppointmentOrThrowAsync(Guid appointmentId)
        {
            if (appointmentId == Guid.Empty)
                throw new UserFriendlyException("Invalid appointment ID.");

            var appointment = await _appointmentRepository.FirstOrDefaultAsync(appointmentId);
            if (appointment == null)
                throw new UserFriendlyException("Appointment not found.");

            return appointment;
        }

        public override async Task<AppointmentDto> CreateAsync(AppointmentDto input)
        {
            try
            {
                if (input == null)
                    throw new UserFriendlyException("Appointment data cannot be null.", Abp.Logging.LogSeverity.Warn);

                var entity = ObjectMapper.Map<Appointment>(input);
                var result = await _appointmentRepository.InsertAsync(entity);

                return ObjectMapper.Map<AppointmentDto>(result);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error("Error creating Appointment", ex);
                throw new UserFriendlyException($"Could not create Appointment. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public override async Task<PagedResultDto<AppointmentDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var items = await AsyncQueryableExecuter.ToListAsync(
                    query.OrderBy(x => x.Id)
                         .Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                return new PagedResultDto<AppointmentDto>(totalCount, ObjectMapper.Map<List<AppointmentDto>>(items));
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving Appointments", ex);
                throw new UserFriendlyException($"Could not retrieve Appointments. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public override async Task<AppointmentDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                var appointment = await GetAppointmentOrThrowAsync(input.Id);
                return ObjectMapper.Map<AppointmentDto>(appointment);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving Appointment with ID {input?.Id}", ex);
                throw new UserFriendlyException($"Could not retrieve Appointment. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public override async Task<AppointmentDto> UpdateAsync(AppointmentDto input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                    throw new UserFriendlyException("Invalid Appointment data.", Abp.Logging.LogSeverity.Warn);

                var entity = await _appointmentRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, entity);

                var updated = await _appointmentRepository.UpdateAsync(entity);
                return ObjectMapper.Map<AppointmentDto>(updated);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error($"Error updating Appointment with ID {input?.Id}", ex);
                throw new UserFriendlyException($"Could not update Appointment. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public override async Task DeleteAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                    throw new UserFriendlyException("Invalid Appointment ID.", Abp.Logging.LogSeverity.Warn);

                await _appointmentRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting Appointment with ID {input?.Id}", ex);
                throw new UserFriendlyException($"Could not delete Appointment. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async Task<AppointmentDto> ConfirmScheduledAppointmentAsync(Guid appointmentId)
        {
            try
            {
                var appointment = await GetAppointmentOrThrowAsync(appointmentId);

                if (appointment.Status != RefListAppointmentStatus.Pending)
                    throw new UserFriendlyException($"Only pending appointments can be confirmed. Current status: {appointment.Status}.");

                appointment.Status = RefListAppointmentStatus.Confirmed;
                var updated = await _appointmentRepository.UpdateAsync(appointment);
                return ObjectMapper.Map<AppointmentDto>(updated);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error("Error confirming appointment", ex);
                throw new UserFriendlyException("An error occurred while confirming the appointment.");
            }
        }

        public async Task<AppointmentDto> RescheduleAppointmentAsync(Guid appointmentId, DateTime newScheduledTime)
        {
            try
            {
                var appointment = await GetAppointmentOrThrowAsync(appointmentId);

                if (appointment.Status == RefListAppointmentStatus.Completed || appointment.Status == RefListAppointmentStatus.Cancelled)
                    throw new UserFriendlyException($"Appointment cannot be rescheduled when status is {appointment.Status}.");

                appointment.ScheduledTime = newScheduledTime;
                var updated = await _appointmentRepository.UpdateAsync(appointment);
                return ObjectMapper.Map<AppointmentDto>(updated);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error("Error rescheduling appointment", ex);
                throw new UserFriendlyException("An error occurred while rescheduling the appointment.");
            }
        }

        public async Task<AppointmentDto> CancelScheduledAppointmentAsync(Guid appointmentId, string reason)
        {
            try
            {
                var appointment = await GetAppointmentOrThrowAsync(appointmentId);

                if (appointment.Status == RefListAppointmentStatus.Completed)
                    throw new UserFriendlyException("Completed appointments cannot be cancelled.");

                appointment.Status = RefListAppointmentStatus.Cancelled;
                appointment.Notes = reason;

                var updated = await _appointmentRepository.UpdateAsync(appointment);
                return ObjectMapper.Map<AppointmentDto>(updated);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error("Error cancelling appointment", ex);
                throw new UserFriendlyException("An error occurred while cancelling the appointment.");
            }
        }

        public async Task<AppointmentDto> MarkAppointmentAsCompletedAsync(Guid appointmentId)
        {
            try
            {
                var appointment = await GetAppointmentOrThrowAsync(appointmentId);

                if (appointment.Status != RefListAppointmentStatus.InProgress)
                    throw new UserFriendlyException($"Only in-progress appointments can be completed. Current status: {appointment.Status}.");

                appointment.Status = RefListAppointmentStatus.Completed;
                var updated = await _appointmentRepository.UpdateAsync(appointment);
                return ObjectMapper.Map<AppointmentDto>(updated);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error("Error completing appointment", ex);
                throw new UserFriendlyException("An error occurred while completing the appointment.");
            }
        }

        public async Task<AppointmentDto> RecordCustomerNoShowAsync(Guid appointmentId)
        {
            try
            {
                var appointment = await GetAppointmentOrThrowAsync(appointmentId);

                if (appointment.Status != RefListAppointmentStatus.Confirmed)
                    throw new UserFriendlyException($"Only confirmed appointments can be marked as no-show. Current status: {appointment.Status}.");

                appointment.Status = RefListAppointmentStatus.NoShow;
                var updated = await _appointmentRepository.UpdateAsync(appointment);
                return ObjectMapper.Map<AppointmentDto>(updated);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error("Error recording no-show", ex);
                throw new UserFriendlyException("An error occurred while recording no-show.");
            }
        }

        public async Task<AppointmentDto> AssignServiceToAppointmentAsync(Guid appointmentId, Guid serviceOfferingId)
        {
            try
            {
                if (serviceOfferingId == Guid.Empty)
                   throw new UserFriendlyException("Invalid service offering ID.", Abp.Logging.LogSeverity.Warn);

                var appointment = await GetAppointmentOrThrowAsync(appointmentId);
                var serviceOffering = await _serviceOfferingRepository.FirstOrDefaultAsync(x => x.Id == serviceOfferingId);
                if (serviceOffering == null)
                    throw new UserFriendlyException("Service offering not found.", Abp.Logging.LogSeverity.Warn);
                
                appointment.ServiceOffering = serviceOffering;
                var updated = await _appointmentRepository.UpdateAsync(appointment);
                return ObjectMapper.Map<AppointmentDto>(updated);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error("Error assigning service", ex);
                throw new UserFriendlyException("An error occurred while assigning the service.");
            }
        }

        public async Task<AppointmentDto> LinkVehicleToAppointmentAsync(Guid appointmentId, Guid vehicleId)
        {
            try
            {   
                if (vehicleId == Guid.Empty)
                    throw new UserFriendlyException("Invalid vehicle ID.", Abp.Logging.LogSeverity.Warn);
                var appointment = await GetAppointmentOrThrowAsync(appointmentId);

                appointment.VehicleId = vehicleId;
                var updated = await _appointmentRepository.UpdateAsync(appointment);
                return ObjectMapper.Map<AppointmentDto>(updated);
            }
            catch (UserFriendlyException) { throw; }
            catch (Exception ex)
            {
                Logger.Error("Error linking vehicle", ex);
                throw new UserFriendlyException("An error occurred while linking the vehicle.");
            }
        }
    }
}