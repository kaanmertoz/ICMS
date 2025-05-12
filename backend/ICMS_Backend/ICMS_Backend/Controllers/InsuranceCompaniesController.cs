using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ICMS_Backend.Data;
using ICMS_Backend.Models;

namespace ICMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceCompaniesController : ControllerBase
    {
        private readonly InsuranceDbContext _context;

        public InsuranceCompaniesController(InsuranceDbContext context)
        {
            _context = context;
        }

        // GET: api/InsuranceCompanies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InsuranceCompany>>> GetInsuranceCompanies()
        {
            return await _context.InsuranceCompanies.ToListAsync();
        }

        // GET: api/InsuranceCompanies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InsuranceCompany>> GetInsuranceCompany(int id)
        {
            var company = await _context.InsuranceCompanies.FindAsync(id);

            if (company == null)
                return NotFound();

            return company;
        }

        // POST: api/InsuranceCompanies
        [HttpPost]
        public async Task<ActionResult<InsuranceCompany>> PostInsuranceCompany(InsuranceCompany company)
        {
            _context.InsuranceCompanies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInsuranceCompany), new { id = company.InsuranceCompanyId }, company);
        }

        // PUT: api/InsuranceCompanies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInsuranceCompany(int id, InsuranceCompany company)
        {
            if (id != company.InsuranceCompanyId)
                return BadRequest();

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.InsuranceCompanies.Any(e => e.InsuranceCompanyId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/InsuranceCompanies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInsuranceCompany(int id)
        {
            var company = await _context.InsuranceCompanies.FindAsync(id);
            if (company == null)
                return NotFound();

            _context.InsuranceCompanies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
