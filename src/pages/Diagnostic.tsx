import React, { useState, useEffect } from "react";
import { runComprehensiveDiagnostic } from "../utils/comprehensiveDiagnostic";
import { comprehensiveDiagnostic } from "../utils/comprehensiveDiagnostic";

const Diagnostic: React.FC = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostic = async () => {
    setLoading(true);
    setError(null);
    try {
      const comprehensiveResults = await runComprehensiveDiagnostic();

      setResults({
        comprehensive: comprehensiveResults,
        summary: comprehensiveDiagnostic.getSummary(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runDiagnostic();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Running MYSTRONIUM™ Diagnostic...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Diagnostic Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">
            No diagnostic results available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MYSTRONIUM™ Platform Diagnostic
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Comprehensive system health check and issue identification
          </p>
          <button
            onClick={runDiagnostic}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Running..." : "Run Diagnostic"}
          </button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            {results.summary}
          </pre>
        </div>

        {/* Comprehensive Results */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comprehensive Diagnostic
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Firebase */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🔥 Firebase
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Configured:</span>
                  <span
                    className={
                      results.comprehensive.firebase.configuration.configured
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {results.comprehensive.firebase.configuration.configured
                      ? "✅"
                      : "❌"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>App Check:</span>
                  <span
                    className={
                      results.comprehensive.firebase.appCheck.enforced
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {results.comprehensive.firebase.appCheck.enforced
                      ? "✅"
                      : "❌"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Admin Access:</span>
                  <span
                    className={
                      results.comprehensive.firebase.authentication.adminAccess
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {results.comprehensive.firebase.authentication.adminAccess
                      ? "✅"
                      : "❌"}
                  </span>
                </div>
              </div>
            </div>

            {/* Stripe */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                💳 Stripe
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Configured:</span>
                  <span
                    className={
                      results.comprehensive.stripe.configuration.configured
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {results.comprehensive.stripe.configuration.configured
                      ? "✅"
                      : "❌"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Webhook Accessible:</span>
                  <span
                    className={
                      results.comprehensive.stripe.webhook.accessible
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {results.comprehensive.stripe.webhook.accessible
                      ? "✅"
                      : "❌"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Signature Validation:</span>
                  <span
                    className={
                      results.comprehensive.stripe.webhook.signatureValidation
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {results.comprehensive.stripe.webhook.signatureValidation
                      ? "✅"
                      : "❌"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issues */}
        {(results.comprehensive.criticalIssues.length > 0 ||
          results.comprehensive.errors.length > 0 ||
          results.comprehensive.warnings.length > 0) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Issues Found
            </h2>

            {results.comprehensive.criticalIssues.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  🚨 Critical Issues
                </h3>
                <ul className="space-y-1">
                  {results.comprehensive.criticalIssues.map(
                    (issue: string, index: number) => (
                      <li key={index} className="text-red-600">
                        • {issue}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {results.comprehensive.errors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  ❌ Errors
                </h3>
                <ul className="space-y-1">
                  {results.comprehensive.errors.map(
                    (error: string, index: number) => (
                      <li key={index} className="text-red-600">
                        • {error}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {results.comprehensive.warnings.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                  ⚠️ Warnings
                </h3>
                <ul className="space-y-1">
                  {results.comprehensive.warnings.map(
                    (warning: string, index: number) => (
                      <li key={index} className="text-yellow-600">
                        • {warning}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Recommendations */}
        {results.comprehensive.recommendations.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              💡 Recommendations
            </h2>
            <ul className="space-y-2">
              {results.comprehensive.recommendations.map(
                (rec: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    • {rec}
                  </li>
                ),
              )}
            </ul>
          </div>
        )}

        {/* Raw Data */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Raw Diagnostic Data
          </h2>
          <details>
            <summary className="cursor-pointer text-purple-600 font-medium mb-2">
              Click to expand raw data
            </summary>
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;
