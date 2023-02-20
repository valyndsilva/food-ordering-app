/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  api: {
    externalResolver: true,
    bodyParser: false, // I added this
  },
};
