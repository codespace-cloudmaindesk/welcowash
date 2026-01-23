using System.ComponentModel.DataAnnotations;

namespace WelcoWash.Domain.Customers
{
    public enum RefListCustomerStatus
    {
        [Display(Name = "Active")]
        Active = 1,

        [Display(Name = "Inactive")]
        Inactive = 2,

        [Display(Name = "Suspended")]
        Suspended = 3,

        [Display(Name = "Closed")]
        Closed = 4,

        [Display(Name = "Prospect")]
        Prospect = 5
    }
}



