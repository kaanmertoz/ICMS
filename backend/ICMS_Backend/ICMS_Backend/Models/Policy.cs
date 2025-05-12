using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ICMS_Backend.Models
{
    public class Policy
    {
        public int PolicyId { get; set; }

        [Required]
        public string PolicyNumber { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [Range(0, double.MaxValue)]
        public decimal PremiumAmount { get; set; }

        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        public Customer Customer { get; set; }

        public ICollection<Claim> Claims { get; set; }
    }
}