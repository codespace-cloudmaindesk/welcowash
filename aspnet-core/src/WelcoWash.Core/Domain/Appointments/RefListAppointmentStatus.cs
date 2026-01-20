using System.ComponentModel.DataAnnotations;

namespace WelcoWash.Domain.Appointments
{
    public enum RefListAppointmentStatus
    {
        [Display(Name = "Pending")]
        Pending = 1,

        [Display(Name = "Confirmed")]
        Confirmed = 2,

        [Display(Name = "In Progress")]
        InProgress = 3,

        [Display(Name = "Completed")]
        Completed = 4,

        [Display(Name = "Cancelled")]
        Cancelled = 5,

        [Display(Name = "No Show")]
        NoShow = 6
    }
}
