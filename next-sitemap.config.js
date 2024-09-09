let siteHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || "nextjs-marketing-website.basehub.com";
let siteUrl = `https://${siteHost}`;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
};

module.exports.siteUrl = siteUrl;
module.exports.siteHost = siteHost;
