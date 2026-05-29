import type { NextConfig } from 'next';

module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev' ],
}

const nextConfig: NextConfig = {
  /* config options here */
  // async redirects() {
  //   return [
  //     {
  //       source: '/dashboard/policy',
  //       destination: '/dashboard',
  //       permanent: false, // 307 temporary redirect
  //     },
  //     // 🛠️ Added the policy_detail redirection rule
  //     {
  //       source: '/dashboard/policy_detail',
  //       destination: '/dashboard',
  //       permanent: false, // 307 temporary redirect
  //     },
  //   ];
  // },
};

export default nextConfig;
