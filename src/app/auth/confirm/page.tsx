'use client';

// Landing page for links in Supabase auth emails, so the links point to promittoltd.com
// instead of the Supabase project domain (a common spam signal).
// Email templates link here with: {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=<type>
// Templates: docs/supabase-email-templates.md

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { EmailOtpType } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

const OTP_TYPES: EmailOtpType[] = ['signup', 'email', 'recovery', 'invite', 'magiclink', 'email_change'];

// Only follow relative links on this site (blocks redirects to other domains)
const safeNext = (next: string | null) => (next && next.startsWith('/') && !next.startsWith('//') ? next : null);

type Status = 'verifying' | 'success' | 'error';

function ConfirmInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>('verifying');
  const [message, setMessage] = useState('Confirming your link…');
  const [isRecovery, setIsRecovery] = useState(false);
  const started = useRef(false); // verify once (tokens are single-use)

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const tokenHash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;
    const next = safeNext(searchParams.get('next'));

    if (!tokenHash || !type || !OTP_TYPES.includes(type)) {
      setStatus('error');
      setMessage('This link is incomplete. Please use the full link from your email.');
      return;
    }
    setIsRecovery(type === 'recovery');

    supabase.auth.verifyOtp({ token_hash: tokenHash, type }).then(({ error }) => {
      if (error) {
        setStatus('error');
        setMessage(
          /expired|invalid/i.test(error.message)
            ? 'This link has expired or has already been used.'
            : `We could not confirm this link: ${error.message}`
        );
        return;
      }

      // Where to go next
      let destination = next ?? '/';
      if (type === 'recovery') destination = '/reset-password?confirmed=1';
      else if (type === 'email_change') destination = next ?? '/profile';
      else if (!next) destination = '/profile';

      setStatus('success');
      setMessage(
        type === 'recovery'
          ? 'Link confirmed. Taking you to set a new password…'
          : type === 'email_change'
            ? 'Your new email address is confirmed. Redirecting…'
            : 'Your email is confirmed. Welcome to Promitto! Redirecting…'
      );
      setTimeout(() => router.replace(destination), 1500);
    });
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        {status === 'verifying' && (
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary" aria-hidden="true" />
        )}
        {status === 'success' && (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600" aria-hidden="true">
            ✓
          </div>
        )}
        {status === 'error' && (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600" aria-hidden="true">
            !
          </div>
        )}

        <h1 className="mt-6 text-2xl font-bold text-primary">
          {status === 'error' ? 'Link not valid' : status === 'success' ? 'Confirmed' : 'Please wait'}
        </h1>
        <p className="mt-3 text-gray-600" role="status">
          {message}
        </p>

        {status === 'error' && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={isRecovery ? '/forgot-password' : '/login'}
              className="rounded-full bg-primary px-6 py-2.5 font-semibold text-white hover:bg-primary/90"
            >
              {isRecovery ? 'Request a new link' : 'Go to login'}
            </Link>
            <Link href="/contact" className="rounded-full border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">
              Contact us
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense>
      <ConfirmInner />
    </Suspense>
  );
}
