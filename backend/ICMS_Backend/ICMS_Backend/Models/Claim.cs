using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ICMS_Backend.Models
{
    public class Claim
    {
        public int ClaimId { get; set; }

        public DateTime ClaimDate { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }

        public string Description { get; set; }

        [ForeignKey("Policy")]
        public int PolicyId { get; set; }

        public Policy Policy { get; set; }
    }
}
