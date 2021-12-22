module.exports = {
  plugins: [
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
