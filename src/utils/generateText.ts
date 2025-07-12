export async function generateText(prompt: string, fallback = false) {
  const key = fallback
    ? import.meta.env.VITE_MISTRAL_API_KEY
    : import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = fallback
    ? 'https://api.mistral.ai/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${key}`,
  };

  const body = JSON.stringify({
    model: fallback ? 'mistral-large-latest' : 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 2000,
    temperature: 0.8
  });

  try {
    const res = await fetch(endpoint, { method: 'POST', headers, body });
    const json = await res.json();
    return json.choices?.[0]?.message?.content || 'Error generating text';
  } catch (error) {
    console.error('Text generation error:', error);
    return 'Error generating text. Please try again.';
  }
}