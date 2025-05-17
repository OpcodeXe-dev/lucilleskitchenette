'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/utils/Supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);


    const uniqueID = crypto.randomUUID();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/recover`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('✅ Check your email for the reset link.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Forgot Password</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        {message && (
          <p className="bg-green-100 text-green-700 text-sm text-center rounded-md px-4 py-2 mb-4">
            {message}
          </p>
        )}
        {error && (
          <p className="bg-red-100 text-red-700 text-sm text-center rounded-md px-4 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <button
          onClick={() => router.back()}
          className="mt-6 w-full text-sm text-yellow-600 hover:text-yellow-700 hover:underline transition"
        >
          ← Go back
        </button>
      </div>
    </div>
  );
}
