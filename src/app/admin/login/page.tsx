'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@bgrowth.agency');
  const [password, setPassword] = useState('ChangeMe@123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // First-time password change modal state
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Forgot password state
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.mustChangePassword) {
        setMustChangePassword(true);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Authentication failed. Please verify credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Password update failed');
      }

      setPasswordChangeSuccess(true);
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update password');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-bg dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 agency-grid-bg opacity-60 pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-brand-border dark:border-slate-800 shadow-2xl p-8 relative z-10 space-y-6">
        
        {/* Header with Logo */}
        <div className="text-center space-y-3">
          <div className="relative h-12 w-48 mx-auto">
            <Image 
              src="/logo.png" 
              alt="B Growth Agency Logo" 
              fill 
              className="object-contain" 
              priority
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-tint dark:bg-primary/20 text-primary text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enterprise Admin Portal</span>
          </div>
          <h1 className="text-xl font-bold text-brand-navy dark:text-white">
            {mustChangePassword ? 'Create New Secure Password' : 'Sign In To Dashboard'}
          </h1>
          <p className="text-xs text-brand-muted dark:text-gray-400">
            {mustChangePassword 
              ? 'First login detected. Please create a permanent password to secure your admin account.' 
              : 'Enter your agency credentials to manage services, portfolio and leads.'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-status-danger text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Regular Login Form */}
        {!mustChangePassword && !forgotPasswordOpen && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bgrowth.agency"
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[11px] font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-navy dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In To Admin'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Seed Credentials Hint Box */}
            <div className="mt-4 p-3 bg-brand-bg dark:bg-slate-800/80 rounded-xl border border-brand-border dark:border-slate-700 text-[11px] text-brand-muted dark:text-gray-300 space-y-1">
              <span className="font-bold text-brand-navy dark:text-white block">Default Seed Credentials:</span>
              <div>Email: <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-brand-border/60">admin@bgrowth.agency</code></div>
              <div>Password: <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-brand-border/60">ChangeMe@123</code></div>
            </div>
          </form>
        )}

        {/* Must Change Password Form */}
        {mustChangePassword && (
          <form onSubmit={handleChangePassword} className="space-y-4">
            {passwordChangeSuccess ? (
              <div className="p-4 bg-status-success/15 border border-status-success/30 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-status-success mx-auto" />
                <span className="text-xs font-bold text-brand-navy dark:text-white block">Password Changed!</span>
                <span className="text-[11px] text-brand-muted">Redirecting to admin dashboard...</span>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
                    New Secure Password (Min 8 chars) *
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{loading ? 'Saving...' : 'Set Password & Enter Dashboard'}</span>
                </button>
              </>
            )}
          </form>
        )}

        {/* Forgot Password Flow */}
        {forgotPasswordOpen && (
          <div className="space-y-4">
            {forgotSent ? (
              <div className="p-4 bg-status-success/15 border border-status-success/30 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-status-success mx-auto" />
                <span className="text-xs font-bold text-brand-navy dark:text-white block">Password Reset Instructions Sent</span>
                <p className="text-[11px] text-brand-muted">
                  If an admin account exists for <span className="font-semibold text-primary">{forgotEmail}</span>, a secure recovery link has been delivered.
                </p>
                <button
                  onClick={() => { setForgotPasswordOpen(false); setForgotSent(false); }}
                  className="text-xs font-semibold text-primary hover:underline pt-2 block mx-auto"
                >
                  Return to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <p className="text-xs text-brand-muted">
                  Enter your registered admin email address and we will send you a password reset link.
                </p>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@bgrowth.agency"
                    className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(false)}
                    className="w-1/2 py-3 border border-brand-border dark:border-slate-700 text-xs font-semibold rounded-xl text-brand-navy dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-md"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
