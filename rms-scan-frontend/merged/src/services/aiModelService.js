// Address of our ASP.NET backend prediction endpoint
const API_URL = "http://localhost:5103/api/prediction";

// This function sends the selected image to the real AI backend
export async function analyzeImage(imageData) {
  if (!imageData) {
    throw new Error("No image was provided for analysis.");
  }

  // Convert the frontend image data into an image file
  const imageResponse = await fetch(imageData);
  const imageBlob = await imageResponse.blob();

  // Create the form used to upload the image
  const formData = new FormData();

  const fileExtension =
    imageBlob.type === "image/png" ? "png" : "jpg";

  formData.append(
    "Image",
    imageBlob,
    `waste-image.${fileExtension}`
  );

  // Send the image to the ASP.NET backend
  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  // Show an error if the backend request was unsuccessful
  if (!response.ok) {
    throw new Error(
      result.error || "The image could not be analyzed."
    );
  }

  // Return the real prediction produced by the AI model
  return result;
}