/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],
    reactStrictMode: true,
    images: {
      domains: ['placehold.co','i.pravatar.cc'],
    },
    
};

export default nextConfig;
