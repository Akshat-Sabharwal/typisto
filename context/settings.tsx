"use client";

import { createContext, useContext, useState } from "react";

type TSetting = {
  time: number;
  words: number;
};

type TSettingProvider = {
  setting: TSetting;
  setSetting: React.Dispatch<React.SetStateAction<TSetting>>;
};

type TSettingProviderProps = {
  children: React.ReactNode;
};

const Setting = createContext<TSettingProvider | null>(null);

export const SettingProvider: React.FC<TSettingProviderProps> = ({
  children,
}) => {
  const [setting, setSetting] = useState<TSetting>({ time: 15, words: 200 });

  return (
    <Setting.Provider value={{ setting, setSetting }}>
      {children}
    </Setting.Provider>
  );
};

export const useSetting = () => {
  const context = useContext(Setting);

  if (!context) {
    throw new Error("Settings malfunctioned!");
  }

  return { ...context };
};
