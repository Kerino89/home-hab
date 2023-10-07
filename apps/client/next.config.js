const path = require("node:path");

// Plugins
const StylelintPlugin = require("stylelint-webpack-plugin");

/**
 * Contains the original absolute root path
 *
 * @param  {Array<string>} pathSegments
 * @returns {String}
 */
const resolveRoot = (...pathSegments) => path.resolve(process.cwd(), ...pathSegments);

module.exports = () => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    swcMinify: true,
    // 💥 This currently breaks with Next.js 13.0.0 app/ dir
    // and a server component in the root layout, with errors like:
    //
    // > React.createContext is not a function
    //
    // More details: https://github.com/emotion-js/emotion/issues/2928#issuecomment-1293885043
    //
    // compiler: {
    //   emotion: true,
    // },
    compress: true, // ? Можно отключить если компрессия настроенна на проксирующим сервере к примеру на nginx
    images: {
      minimumCacheTTL: 60,
      dangerouslyAllowSVG: false,
      contentDispositionType: "attachment",
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    modularizeImports: {
      lodash: {
        transform: "lodash/{{member}}",
      },
    },
    sassOptions: {
      includePaths: [resolveRoot("src", "styles", "common")],
    },
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:5000/api/:path*",
        },
      ];
    },
    webpack(config) {
      config.plugins.push(
        new StylelintPlugin({
          extensions: ["scss", "ts", "tsx"],
          failOnError: false,
        }),
      );

      const svgLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

      config.module.rules.push(
        {
          ...svgLoaderRule,
          test: /\.svg$/i,
          resourceQuery: { not: [...svgLoaderRule?.resourceQuery?.not, /r/] },
        },
        {
          test: /\.svg$/,
          resourceQuery: /r/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                typescript: false,
                svgoConfig: {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                    "prefixIds",
                  ],
                },
              },
            },
          ],
        },
      );

      svgLoaderRule.exclude = /\.svg$/i;

      return config;
    },
  };

  return nextConfig;
};
