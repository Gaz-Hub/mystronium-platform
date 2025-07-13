export default function Privacy() {
  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-gray-300">
        <p>This is the privacy policy page. Replace with real legal copy.</p>
        <p>
          Your privacy is important to us. This policy explains how your data is
          handled on MYSTRONIUM™.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>We use Firebase Auth to manage login securely</li>
          <li>We store usage analytics but never sell user data</li>
          <li>AI prompts may be temporarily cached for output quality</li>
          <li>We comply with GDPR and related data protection standards</li>
        </ul>
      </div>
    </div>
  );
}
