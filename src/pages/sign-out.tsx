import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { LogOut } from 'lucide-react';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      await signOut({ redirect: false });
      await router.push('/');
    };

    const timer = setTimeout(() => {
      void performSignOut();
    }, 2000); // Wait for 2 seconds before signing out

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Signing Out</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-indigo-100">
        <div className="text-center">
          <LogOut className="mx-auto h-16 w-16 text-gray-900 mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Signing you out...</h1>
          <p className="text-gray-500 text-lg">Please wait while we securely sign you out.</p>
        </div>
        <div className="mt-8">
          <div className="w-64 h-2 bg-slate-50 rounded-full">
            <div className="w-full h-full bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
}