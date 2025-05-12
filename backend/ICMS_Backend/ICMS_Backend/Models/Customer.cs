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
        public string FullName { get; set; }

        public DateTime DateOfBirth { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        [ForeignKey("InsuranceCompany")]
        public int InsuranceCompanyId { get; set; }

        public InsuranceCompany InsuranceCompany { get; set; }

        public ICollection<Policy> Policies { get; set; }

        public ICollection<Payment> Payments { get; set; }
    }
}