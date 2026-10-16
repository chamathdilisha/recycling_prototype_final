// meka Backend application eka build karanna awashya wena
// basic structure eka saha settings create karanawa
var builder = WebApplication.CreateBuilder(args);

// Meka Controllers folder eken API controller files use karanna 
// application ekata permission denawa(allow) karanawa
builder.Services.AddControllers();

// Add Swagger services
// Swaggger ekata udaw karanawa available API endpoints discover karaganna
builder.Services.AddEndpointsApiExplorer();
// Meken API ekata Swagger documentation eka hadanawa
builder.Services.AddSwaggerGen();

// Allow the React frontend to communicate with this backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://127.0.0.1:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// meken uda add karapu service saha settings bawitha karala
// backend application eka build karanawa
var app = builder.Build();

// Swagger API information eka JSON file ekak widihata hadanawa
app.UseSwagger();

// Meken visual Swagger webpage eka hadanawa
// In Swagger webpage, we can view and test the EcoSort API endpoints
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint(
        "/swagger/v1/swagger.json",
        "EcoSort API V1"
    );
});

// Meken insecure HTTP requests automatically redirect karanawa secure HTTPS walata
app.UseHttpsRedirection();
app.UseCors("FrontendPolicy");
// Meken Authorization checks enable karanawa
// passe dawasaka endpoints keepayak secure kirimata awashya u wita 
// meya prayoganawath wiya hakii
app.UseAuthorization();

// connects routes inside your controller files to the application
app.MapControllers();

// Meken EcoSort backend eka start karanawa
app.Run();