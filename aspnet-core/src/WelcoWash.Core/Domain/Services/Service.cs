using Abp.Domain.Values;
using System.Collections.Generic;

namespace WelcoWash.Domain.Services
{
    public class Service : ValueObject
    {
        public ReferenceListServiceName Name { get; set; }
        public string Description { get; set; }
        public int DurationInMinutes { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Name;
            yield return Description;
            yield return DurationInMinutes;
            yield return Price;
            yield return IsAvailable;
        }
    }
}
