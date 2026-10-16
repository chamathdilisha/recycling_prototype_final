// API controller ekak hadanna ASP.NET Core tools import karagannawa
using Microsoft.AspNetCore.Mvc;

// Me controller eka EcoSort.Api.Controllers namespace eka athule danawa
namespace EcoSort.Api.Controllers;

// ASP.NET Core ekata kiyanawa me class eka API controller ekak kiyala
[ApiController]
// Me controller ekata URL path eka set karanawa
[Route("api/health")]

// HealthController kiyala controller ekak hadanawa
// ControllerBase eka aththyawashya API features denawa, nikan ok() method wage
public class HealthController : ControllerBase
{
    // kawuruhari GET request ekak yawwoth /api/health ekata, meken follow wena method
    // eka aniwa run karanna
    [HttpGet]
    // HTTP response return karanna GetStatus() kiyala method ekak hadanawa
    public IActionResult GetStatus()
    {
        // Returns a successful HTTP 200 OK response containing this JSON
        return Ok(new
        {
            status = "Running",
            message = "EcoSort backend is working correctly."
        });
    }
}


// meken hadanne 'GET /api/health' eka
// kawuruhari API endpoint ekata request ekak yawwama
// backend eka simple message ekak return karanawa
// endpoint eka wada kiyala confirm karala 