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
        public string PhoneNumber { get; set; }
        #endregion

        #region Employment Information
        public DateOnly? EmploymentStartDate { get; set; }
        public DateOnly? EmploymentEndDate { get; set; }
        public RefListEmploymentStatus EmployementStatus { get; set; }
        #endregion
    }
}
