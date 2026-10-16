// Uploaded file ekak receive karaganna awashya wena ASP.NET Core tools import karagannawa
using Microsoft.AspNetCore.Http;

// Me code eka EcoSort API project eke Models section eke place karannalu
namespace EcoSort.Api.Models;

// Public model ekak hadanawa PredictionRequest kiyala
// meka frontend eken receive karaganna image eka store karagannawa
public class PredictionRequest
{
    // EcoSort frontend eken upload karapu image eka
    // Me model eka receive karagena temporarily hold karagannawa
    public IFormFile? Image { get; set; }
}