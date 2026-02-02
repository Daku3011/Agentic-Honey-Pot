import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ChevronDown, 
  ChevronUp,
  Server,
  Key,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EndpointTester = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTest = async (e) => {
    e.preventDefault();
    if (!url || !apiKey) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      // Using fetch to test the endpoint
      const response = await fetch(url, {
        method: 'GET', // Or POST depending on what the honeypot expects, defaulting to GET for responsiveness check
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json().catch(() => ({ message: "Non-JSON response received" }));
      
      setResult({
        status: response.status,
        ok: response.ok,
        data: data,
        headers: [...response.headers.entries()]
      });

    } catch (err) {
      setError({
        message: err.message,
        type: "Network Error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="glass overflow-hidden">
        {/* Header */}
        <div 
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
              <Activity size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg flex items-center gap-2">
                Agentic Honey-Pot – API Endpoint Tester
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Active
            </span>
            {isOpen ? <ChevronUp size={20} className="text-text-dim" /> : <ChevronDown size={20} className="text-text-dim" />}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10"
            >
              <div className="p-6 space-y-6">
                {/* Description */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 border-l-4 border-l-accent-purple">
                  <p className="text-sm text-text-dim leading-relaxed">
                    This Honeypot API Endpoint Tester allows participants to validate whether their deployed honeypot service is reachable, secured, and responding correctly. The tester verifies authentication, endpoint availability, and response behavior using a simple request.
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="font-bold text-accent-cyan flex items-center gap-2 mb-4">
                    <Shield size={18} />
                    How to Use the Honeypot Endpoint Tester
                  </h3>
                  <p className="text-sm text-text-dim mb-4">
                    This tool helps participants verify that their Honeypot API endpoint is properly deployed and secured.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-sm text-white mb-2">Steps:</h4>
                      <ul className="list-disc list-inside text-sm text-text-dim space-y-1 ml-2">
                        <li>Enter your deployed Honeypot API endpoint URL</li>
                        <li>Provide the required <span className="text-white font-medium">API key</span> in the request header</li>
                        <li>Click <span className="text-white font-medium">Test Honeypot Endpoint</span> to send the request</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-white mb-2">What This Tests:</h4>
                      <ul className="list-disc list-inside text-sm text-text-dim space-y-1 ml-2">
                        <li>API authentication using headers</li>
                        <li>Endpoint availability and connectivity</li>
                        <li>Proper request handling</li>
                        <li>Response structure and status codes</li>
                        <li>Basic honeypot behavior validation</li>
                      </ul>
                    </div>

                    <p className="text-xs text-text-dim italic mt-4">
                      <span className="font-bold text-white">Note:</span> This tester is for validation only. The final evaluation will involve automated security interaction scenarios.
                    </p>
                  </div>
                </div>

                {/* Testing Form */}
                <div className="glass p-6">
                  <form onSubmit={handleTest} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                        Headers <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        <label className="text-xs text-text-dim">x-api-key *</label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dim" size={16} />
                          <input
                            type="text"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter x-api-key"
                            className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent-purple transition-colors"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                        Honeypot API Endpoint URL <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dim" size={16} />
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="Enter honeypot api endpoint url"
                          className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent-purple transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => { setUrl(''); setApiKey(''); setResult(null); setError(null); }}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-text-dim hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Testing...
                          </>
                        ) : (
                          'Test Honeypot Endpoint'
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Results Display */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border ${result.ok ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}
                  >
                    <div className="flex items-start gap-3">
                      {result.ok ? (
                        <CheckCircle className="text-green-400 shrink-0 mt-1" size={20} />
                      ) : (
                        <XCircle className="text-red-400 shrink-0 mt-1" size={20} />
                      )}
                      <div className="w-full overflow-hidden">
                        <h4 className={`font-bold ${result.ok ? 'text-green-400' : 'text-red-400'}`}>
                          Status: {result.status} {result.ok ? 'Success' : 'Failed'}
                        </h4>
                        <div className="mt-2 space-y-2">
                          <p className="text-xs text-text-dim uppercase tracking-wider font-bold">Response Body:</p>
                          <pre className="bg-black/30 p-3 rounded-lg text-xs font-mono overflow-x-auto text-text-dim">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
                  >
                    <AlertTriangle className="text-red-400 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-red-400">Connection Failed</h4>
                      <p className="text-sm text-text-dim mt-1">{error.message}</p>
                      <p className="text-xs text-text-dim mt-2 italic">
                        Check if the URL is correct and CORS is enabled on your backend if testing from a browser.
                      </p>
                    </div>
                  </motion.div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EndpointTester;
