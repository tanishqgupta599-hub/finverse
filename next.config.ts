import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "framer-motion",
      "date-fns",
      "@radix-ui/react-dialog",
      "@radix-ui/react-switch", 
      "@radix-ui/react-tabs",
      "@clerk/nextjs"
    ],
  },
};

export default nextConfig;
