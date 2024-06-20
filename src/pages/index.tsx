import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Outline } from "@/components/Outline";

export default function Home() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="m-5">You are not signed in</h2>
        <Button onClick={() => signIn()}>Sign In</Button>
      </div>
    );
  } else
    return (
      <>
        <Head>
          <title>Finance Tracker</title>
          <meta name="description" content="A simple finance tracker app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <Outline />
        </main>
      </>
    );
}
