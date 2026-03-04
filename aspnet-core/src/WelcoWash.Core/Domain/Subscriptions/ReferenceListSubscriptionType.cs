using System.ComponentModel.DataAnnotations;

namespace WelcoWash.Domain.Subscriptions
{
    public enum ReferenceListSubscriptionType
    {
        [Display(Name = "Basic")]
        Basic = 1,

        [Display(Name = "Standard")]
        Standard = 2,

        [Display(Name = "Premium")]
        Premium = 3,
    }
}
