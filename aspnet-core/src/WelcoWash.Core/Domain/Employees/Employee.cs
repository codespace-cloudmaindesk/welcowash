using Abp.Domain.Entities.Auditing;
using System;

namespace WelcoWash.Domain.Employees
{
    public class Employee: FullAuditedEntity<Guid>
    {
        #region Details
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        #endregion

        #region Business State
        public bool IsActive { get; protected set; } = true;
        #endregion

        #region Domain Behavior
        public void Deactivate() { IsActive = false; }
        public void Activate() { IsActive = true; }
        #endregion
    }
}
