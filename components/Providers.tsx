"use client";

import { SettingProvider } from "@/context/settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const client = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <SettingProvider>{children}</SettingProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
