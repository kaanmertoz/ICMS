using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ICMS_Backend.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        [ForeignKey("InsuranceCompany")]
        public int InsuranceCompanyId { get; set; }

        public InsuranceCompany? InsuranceCompany { get; set; }

        public ICollection<Policy>? Policies { get; set; }

        public ICollection<Payment>? Payments { get; set; }

        public string InsuranceType { get; set; } = string.Empty;
        
        public string Status { get; set; } = string.Empty;

    }
}
