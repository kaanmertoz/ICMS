using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ICMS_Backend.Data;
using ICMS_Backend.Models;

namespace ICMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoliciesController : ControllerBase
    {
        private readonly InsuranceDbContext _context;

        public PoliciesController(InsuranceDbContext context)
        {
            _context = context;
        }

        // GET: api/Policies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Policy>>> GetPolicies()
        {
            return await _context.Policies
                .Include(p => p.Customer)
                .ToListAsync();
        }

        // GET: api/Policies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Policy>> GetPolicy(int id)
        {
            var policy = await _context.Policies
                .Include(p => p.Customer)
                .FirstOrDefaultAsync(p => p.PolicyId == id);

            if (policy == null)
                return NotFound();

            return policy;
        }

        // POST: api/Policies
        [HttpPost]
        public async Task<ActionResult<Policy>> PostPolicy(Policy policy)
        {
            _context.Policies.Add(policy);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPolicy), new { id = policy.PolicyId }, policy);
        }

        // PUT: api/Policies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPolicy(int id, Policy policy)
        {
            if (id != policy.PolicyId)
                return BadRequest();

            _context.Entry(policy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Policies.Any(e => e.PolicyId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Policies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePolicy(int id)
        {
            var policy = await _context.Policies.FindAsync(id);
            if (policy == null)
                return NotFound();

            _context.Policies.Remove(policy);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
