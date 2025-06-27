/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.freepik.es",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
