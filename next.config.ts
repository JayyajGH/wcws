/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // S3 can't resize images on the fly
  },
};

export default nextConfig;

