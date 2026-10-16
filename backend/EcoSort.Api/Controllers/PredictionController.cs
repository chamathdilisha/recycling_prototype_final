using System.Diagnostics;
using System.Text.Json;
using EcoSort.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcoSort.Api.Controllers;

[ApiController]
[Route("api/prediction")]
public class PredictionController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;

    private static readonly HashSet<string> AllowedExtensions =
        new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg",
            ".jpeg",
            ".png"
        };

    public PredictionController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    [RequestSizeLimit(10 * 1024 * 1024)]
    public async Task<IActionResult> Predict(
        [FromForm] PredictionRequest request)
    {
        // Check whether an image was provided
        if (request.Image is null || request.Image.Length == 0)
        {
            return BadRequest(new
            {
                error = "Please upload an image."
            });
        }

        // Check whether the uploaded file is an accepted image type
        string extension = Path.GetExtension(request.Image.FileName);

        if (!AllowedExtensions.Contains(extension))
        {
            return BadRequest(new
            {
                error = "Only JPG, JPEG, and PNG images are allowed."
            });
        }

        // Find the main recycling_prototype folder
        string projectRoot = Path.GetFullPath(
            Path.Combine(_environment.ContentRootPath, "..", "..")
        );

        // Find the virtual-environment Python program
        string pythonPath = Path.Combine(
            projectRoot,
            "venv",
            "Scripts",
            "python.exe"
        );

        // Find the Python bridge file
        string predictionScriptPath = Path.Combine(
            projectRoot,
            "predict_for_api.py"
        );

        // Confirm that the required files exist
        if (!System.IO.File.Exists(pythonPath))
        {
            return StatusCode(500, new
            {
                error = "The Python virtual environment was not found."
            });
        }

        if (!System.IO.File.Exists(predictionScriptPath))
        {
            return StatusCode(500, new
            {
                error = "The Python prediction program was not found."
            });
        }

        // Create a temporary location for the uploaded image
        string temporaryImagePath = Path.Combine(
            Path.GetTempPath(),
            $"{Guid.NewGuid()}{extension}"
        );

        try
        {
            // Save the uploaded image temporarily
            await using (var stream =
                System.IO.File.Create(temporaryImagePath))
            {
                await request.Image.CopyToAsync(stream);
            }

            // Prepare the Python command
            var processStartInfo = new ProcessStartInfo
            {
                FileName = pythonPath,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            processStartInfo.ArgumentList.Add(predictionScriptPath);
            processStartInfo.ArgumentList.Add(temporaryImagePath);

            // Run the Python prediction program
            using var process = new Process
            {
                StartInfo = processStartInfo
            };

            process.Start();

            Task<string> outputTask =
                process.StandardOutput.ReadToEndAsync();

            Task<string> errorTask =
                process.StandardError.ReadToEndAsync();

            await process.WaitForExitAsync();

            string output = await outputTask;
            string errorOutput = await errorTask;

            // Handle a Python error
            if (process.ExitCode != 0)
            {
                return StatusCode(500, new
                {
                    error = "The AI model could not process the image.",
                    details = string.IsNullOrWhiteSpace(errorOutput)
                        ? output
                        : errorOutput
                });
            }

            // Convert Python JSON into an ASP.NET response
            string jsonText = output;
            int firstBrace = output.IndexOf('{');
            int lastBrace = output.LastIndexOf('}');
            if (firstBrace >= 0 && lastBrace > firstBrace)
            {
                jsonText = output.Substring(firstBrace, lastBrace - firstBrace + 1);
            }

            using JsonDocument jsonDocument =
                JsonDocument.Parse(jsonText);

            return Ok(jsonDocument.RootElement.Clone());
        }
        catch (Exception error)
        {
            return StatusCode(500, new
            {
                error = "An unexpected prediction error occurred.",
                details = error.Message
            });
        }
        finally
        {
            // Delete the temporary image after prediction
            if (System.IO.File.Exists(temporaryImagePath))
            {
                System.IO.File.Delete(temporaryImagePath);
            }
        }
    }
}