using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ICMS_Backend.Models
{
    public class InsuranceCompany
    {
        public int InsuranceCompanyId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Address { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public ICollection<Customer> Customers { get; set; } = new List<Customer>();
    }
}
