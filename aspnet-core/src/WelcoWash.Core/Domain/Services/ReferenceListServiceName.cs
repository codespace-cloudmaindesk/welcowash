using System.ComponentModel.DataAnnotations;

namespace WelcoWash.Domain.Services
{
    public enum ReferenceListServiceName
    {
        [Display(Name = "Exterior Wash")]
        ExteriorWash = 1,

        [Display(Name = "Interior Vacuuming")]
        InteriorVacuuming = 2,

        [Display(Name = "Full Detailing")]
        FullDetailing = 3,

        [Display(Name = "Waxing & Polishing")]
        WaxingPolishing = 4,

        [Display(Name = "Tire & Wheel Cleaning")]
        TireWheelCleaning = 5,

        [Display(Name = "Engine Cleaning")]
        EngineCleaning = 6
    }
}
