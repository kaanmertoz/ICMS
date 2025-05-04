using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Payment
{
    public int PaymentId { get; set; }

    public DateTime PaymentDate { get; set; }

    [Range(0, double.MaxValue)]
    public decimal Amount { get; set; }

    public string Method { get; set; }

    [ForeignKey("Customer")]
    public int CustomerId { get; set; }

    public Customer Customer { get; set; }
}
