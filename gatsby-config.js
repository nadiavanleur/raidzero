require("dotenv").config({
  path: `.env`,
});

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require(`node-sass`),
        sassOptions: {
          indentedSyntax: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets\/icons/,
        },
      },
    },
  ],
};
