export async function generateImage(prompt: string, fallback = false) {
  const key = fallback
    ? import.meta.env.VITE_HUGGINGFACE_API_KEY
    : import.meta.env.VITE_REPLICATE_API_TOKEN;

  const endpoint = fallback
    ? "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"
    : "https://api.replicate.com/v1/predictions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };

  const body = fallback
    ? JSON.stringify({ inputs: prompt })
    : JSON.stringify({
        version:
          "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        input: {
          prompt,
          width: 1024,
          height: 1024,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
        },
      });

  try {
    const res = await fetch(endpoint, { method: "POST", headers, body });
    const json = await res.json();

    if (fallback) {
      return json?.image || "";
    } else {
      // For Replicate, we need to poll for completion
      return json?.urls?.get || json?.id || "";
    }
  } catch (error) {
    console.error("Image generation error:", error);
    return "";
  }
}
