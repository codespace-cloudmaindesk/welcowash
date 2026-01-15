using Abp.Application.Services;
using System;
using WelcoWash.Appointments.Dto;

namespace WelcoWash.Appointments
{
    public interface IAppointmentAppService : IAsyncCrudAppService<AppointmentDto, Guid>
    {
    }
}
