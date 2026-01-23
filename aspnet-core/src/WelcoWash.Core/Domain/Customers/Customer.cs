using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using WelcoWash.Domain.Vehicles;

namespace WelcoWash.Domain.Customers
{
    public class Customer : FullAuditedEntity<Guid>
    {
        #region Details
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        #endregion

        #region Account Information
        public DateOnly? AccountStartDate { get; set; }
        public DateOnly? AccountClosureDate { get; set; }
        public RefListCustomerStatus? CustomerStatus { get; set; }
        #endregion

        #region Navigation
        public ICollection<Vehicle> Vehicles { get; set; }
        public long UserId { get; set; }
        #endregion
    }
}
