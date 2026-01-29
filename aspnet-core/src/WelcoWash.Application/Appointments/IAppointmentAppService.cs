using Abp.Application.Services;
using System;
using System.Threading.Tasks;
using WelcoWash.Appointments.Dto;

namespace WelcoWash.Appointments
{
    public interface IAppointmentAppService
        : IAsyncCrudAppService<AppointmentDto, Guid>
    {
        Task<AppointmentDto> ConfirmAppointment(Guid input);
    }
}
