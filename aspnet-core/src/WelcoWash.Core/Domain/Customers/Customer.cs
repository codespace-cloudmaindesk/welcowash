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

        #region Business State
        public bool IsActive { get; protected set; } = true;
        #endregion

        #region Navigation
        public ICollection<Vehicle> Vehicles { get; set; }
        public long UserId { get; set; }
        #endregion

        #region Domain Behavior
        public void Deactivate(){ IsActive = false;}
        public void Activate(){ IsActive = true;}
        #endregion
    }
}
