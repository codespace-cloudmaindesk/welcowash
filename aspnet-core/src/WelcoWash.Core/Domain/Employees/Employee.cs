using Abp.Domain.Entities.Auditing;
using System;

namespace WelcoWash.Domain.Employees
{
    public class Employee: FullAuditedEntity<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
