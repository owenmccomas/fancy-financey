import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ComponentType, FC } from "react";
import LoadingSpinner from "./LoadingSpinner";

export function withAuth<P extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<P>): FC<P> {
  const WithAuth: FC<P> = (props) => {
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

  const wrappedComponentName = WrappedComponent.displayName 
    || WrappedComponent.name 
    || 'Component';

  WithAuth.displayName = `withAuth(${wrappedComponentName})`;

  return WithAuth;
}