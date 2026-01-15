using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using WelcoWash.Appointments.Dto;
using WelcoWash.Domain.Appointments;

namespace WelcoWash.Appointments
{
    public class AppointmentAppService : AsyncCrudAppService<Appointment, AppointmentDto, Guid, PagedAndSortedResultRequestDto, AppointmentDto, AppointmentDto>, IAppointmentAppService
    {
        private readonly IRepository<Appointment, Guid> _repository;
        public AppointmentAppService(IRepository<Appointment, Guid> repository)
            : base(repository)
        {
            _repository = repository;
        }
    }
}
