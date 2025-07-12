export async function fetchFromMistral(prompt: string) {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_MISTRAL_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistral-medium",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response";
}
