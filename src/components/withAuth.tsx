import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ComponentType } from "react";
import LoadingSpinner from "./LoadingSpinner";

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WithAuth: ComponentType<P> = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; 
      if (!session) void router.replace("/"); 
    }, [session, status, router]);

    if (status === "loading") {
      return <LoadingSpinner />;
    }

    if (!session) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.keys(WrappedComponent as any).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (WithAuth as any)[key] = (WrappedComponent as any)[key];
  });

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;

  return WithAuth;
}