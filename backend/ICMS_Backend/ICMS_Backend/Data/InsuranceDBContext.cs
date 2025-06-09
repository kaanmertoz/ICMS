namespace ICMS_Backend.Data;
using ICMS_Backend.Models;
using Microsoft.EntityFrameworkCore;

public class InsuranceDbContext : DbContext
{
    public InsuranceDbContext(DbContextOptions<InsuranceDbContext> options) : base(options) { }

    public DbSet<InsuranceCompany> InsuranceCompanies { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Policy> Policies { get; set; }
    public DbSet<Claim> Claims { get; set; }
    public DbSet<Payment> Payments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Optional: Fluent API ile ek yapılandırmalar yapılabilir
        base.OnModelCreating(modelBuilder);
    }
}
