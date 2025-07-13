export async function generateVoice(
  text: string,
  voiceId = "EXAVITQu4vr4xnSDxMaL",
) {
  const key = import.meta.env.VITE_ELEVENLABS_API_KEY;

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      },
    );

    if (!res.ok) {
      throw new Error(`ElevenLabs API error: ${res.status}`);
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Voice generation error:", error);
    return "";
  }
}
