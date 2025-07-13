import React, { useEffect, useState } from 'react';

const FirebaseTest: React.FC = () => {
  const [envInfo, setEnvInfo] = useState<any>(null);

  useEffect(() => {
    // Test environment variables
    const testEnv = {
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD,
      allViteVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')),
      firebaseVars: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
      }
    };

    setEnvInfo(testEnv);
    console.log('🔍 FirebaseTest Component - Environment Info:', testEnv);
  }, []);

  if (!envInfo) {
    return <div>Loading environment info...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '12px' }}>
      <h3>🔍 Firebase Environment Variables Test</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Environment Mode:</strong> {envInfo.mode}<br/>
        <strong>Is Development:</strong> {envInfo.dev ? 'Yes' : 'No'}<br/>
        <strong>Is Production:</strong> {envInfo.prod ? 'Yes' : 'No'}<br/>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <strong>All VITE_ Variables:</strong>
        <ul>
          {envInfo.allViteVars.map((key: string) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Firebase Variables:</strong>
        <ul>
          {Object.entries(envInfo.firebaseVars).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value ? `${String(value).substring(0, 20)}...` : 'UNDEFINED'}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <strong>Check browser console for detailed logs</strong>
      </div>
    </div>
  );
};

export default FirebaseTest; 