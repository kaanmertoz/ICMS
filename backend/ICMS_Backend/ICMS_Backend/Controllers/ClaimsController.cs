using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ICMS_Backend.Data;
using ICMS_Backend.Models;

namespace ICMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimsController : ControllerBase
    {
        private readonly InsuranceDbContext _context;

        public ClaimsController(InsuranceDbContext context)
        {
            _context = context;
        }

        // GET: api/Claims
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Claim>>> GetClaims()
        {
            return await _context.Claims
                .Include(c => c.Policy)
                .ThenInclude(p => p.Customer)
                .ToListAsync();
        }

        // GET: api/Claims/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Claim>> GetClaim(int id)
        {
            var claim = await _context.Claims
                .Include(c => c.Policy)
                .ThenInclude(p => p.Customer)
                .FirstOrDefaultAsync(c => c.ClaimId == id);

            if (claim == null)
                return NotFound();

            return claim;
        }

        // POST: api/Claims
        [HttpPost]
        public async Task<ActionResult<Claim>> PostClaim(Claim claim)
        {
            _context.Claims.Add(claim);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClaim), new { id = claim.ClaimId }, claim);
        }

        // PUT: api/Claims/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClaim(int id, Claim claim)
        {
            if (id != claim.ClaimId)
                return BadRequest();

            _context.Entry(claim).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Claims.Any(e => e.ClaimId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Claims/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClaim(int id)
        {
            var claim = await _context.Claims.FindAsync(id);
            if (claim == null)
                return NotFound();

            _context.Claims.Remove(claim);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
