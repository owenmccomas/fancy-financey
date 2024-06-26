import { withAuth } from "@/components/withAuth";
import { Outline } from "@/components/Outline";
import Head from "next/head";

function Dashboard() {
  return (
    <>
      <Head>
        <title>Finance Tracker Dashboard</title>
        <meta name="description" content="Your personal finance dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Outline />
      </main>
    </>
  );
}

export default withAuth(Dashboard);