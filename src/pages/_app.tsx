import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import ModalsContext from "../contexts/ModalsContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ModalsContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalsContext>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
