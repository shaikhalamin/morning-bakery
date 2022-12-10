import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import BakeryProvider from "context/BakeryProvider";
import BakeryLayout from "@/components/layouts/BakeryLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { session, ...allProps } = pageProps;

  if (!Component.getLayout) {
    return (
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <SSRProvider>
          <BakeryProvider>
            <BakeryLayout>
              <Component {...allProps} />
            </BakeryLayout>
          </BakeryProvider>
        </SSRProvider>
      </SessionProvider>
    );
  }

  const layoutWrapper = getLayout(
    <SSRProvider>
      <BakeryProvider>
        <Component {...allProps} />
      </BakeryProvider>
    </SSRProvider>
  );

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {layoutWrapper}
    </SessionProvider>
  );
};

export default MyApp;
