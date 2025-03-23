import { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { hardhatChain } from "../utils/config";

const config = getDefaultConfig({
  appName: "safelock",
  projectId: "1d26e3b9bc5a24bc32a6f92da8f54a85",
  chains: [hardhatChain, sepolia],
  ssr: false,
});

const queryClient = new QueryClient();

const CustomRainbowKitProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            fontStack: "system",
            overlayBlur: "small",
            borderRadius: "large",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default CustomRainbowKitProvider;
