/** @type {import('next').NextConfig} */

const nextConfig = {
  // async redirects() {
  //   const { data } = await fetch(
  //     process.env.BASEHUB_DEBUG_FORCED_URL ?? "https://api.basehub.com/graphql",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.BASEHUB_TOKEN}`,
  //       },
  //       body: JSON.stringify({
  //         query: `query {
  //         sets {
  //           languages {
  //             variants {
  //               isDefault
  //               apiName
  //             }
  //           }
  //         }
  //       }`,
  //       }),
  //       cache: "no-cache",
  //     },
  //   ).then((res) => res.json());

  //   const locales = data.sets.languages.variants.map((v) => v.apiName);
  //   const defaultApiName = data.sets.languages.variants.find((v) => v.isDefault).apiName;

  //   return [
  //     {
  //       source: `/:locale((?!${locales.join("|")})[^/]+)/:path*`,
  //       destination: `/${defaultApiName}/:path*`,
  //       permanent: false,
  //     },
  //   ];
  // },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/blog",
          destination: "/en/blog",
        },
        {
          source: "/blog/:path*",
          destination: "/en/blog/:path*",
        },
      ],
    };
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  transpilePackages: ["shiki"],
  images: {
    remotePatterns: [{ hostname: "assets.basehub.com" }, { hostname: "basehub.earth" }],
  },
};

module.exports = nextConfig;
