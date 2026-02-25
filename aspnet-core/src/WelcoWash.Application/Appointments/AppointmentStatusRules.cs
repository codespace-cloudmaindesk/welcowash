using System.Collections.Generic;
using System.Linq;
using Abp.UI;
using WelcoWash.Domain.Appointments;

namespace WelcoWash.Appointments
{
    public static class AppointmentStatusRules
    {
        private static readonly Dictionary<RefListAppointmentStatus, RefListAppointmentStatus[]> _allowed = new()
        {
            [RefListAppointmentStatus.Pending]    = 
            [
                RefListAppointmentStatus.Confirmed,
                RefListAppointmentStatus.Cancelled
            ],
            [RefListAppointmentStatus.Confirmed]  = 
            [
                RefListAppointmentStatus.InProgress,
                RefListAppointmentStatus.NoShow,
                RefListAppointmentStatus.Cancelled
            ],
            [RefListAppointmentStatus.InProgress] = 
            [
                RefListAppointmentStatus.Completed,
                RefListAppointmentStatus.Cancelled
            ],
            [RefListAppointmentStatus.Completed]  = [],
            [RefListAppointmentStatus.NoShow]     = [],
            [RefListAppointmentStatus.Cancelled]  = [],
        };

        public static bool CanTransitionTo(
            RefListAppointmentStatus from,
            RefListAppointmentStatus to)
            => _allowed.TryGetValue(from, out var allowed) && allowed.Contains(to);

        public static void Validate(
            RefListAppointmentStatus from,
            RefListAppointmentStatus to)
        {
            if (!CanTransitionTo(from, to))
                throw new UserFriendlyException(
                    $"Invalid status transition: {from} → {to}.");
        }
    }
}