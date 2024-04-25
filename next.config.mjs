/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        outputFileTracingIncludes: {
            '/api/saveFormData': ['./pages/**/*'],
          },
    }
};

export default nextConfig;
