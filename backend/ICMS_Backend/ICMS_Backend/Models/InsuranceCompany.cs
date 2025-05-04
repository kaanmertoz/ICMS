using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

    public ICollection<Customer> Customers { get; set; }
}
