import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!sessionData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100">
        <h2 className="m-5 mb-1 text-2xl text-center">
          Welcome to Your New Favorite Finance Tracker
        </h2>
        <h3 className="mb-3 text-gray-500">
          Go on and sign in to get started.
        </h3>
        <Button onClick={() => void signIn()}>Sign In</Button>
      </div>
    );
  }

  return null;
}
