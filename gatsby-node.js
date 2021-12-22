/**
 * space_id=8wfmqgu10mnd
 * access_token=Dd6TfLSKZjDyLQrMjJ41BGJF7dhyn1bdfBO1iS8154U
 * environment_id=master
 *
 * Base URL
 * https://cdn.contentful.com
 *
 * Preview URL
 * https://preview.contentful.com
 *
 * Get space
 * GET /spaces/{space_id}?access_token={access_token}
 *
 * Get entries
 * GET /spaces/{space_id}/environments/{environment_id}/entries?access_token={access_token}
 *
 * Get maximum include depth
 * &include=10
 */

const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

const BASE_URL = "https://cdn.contentful.com";
const PREVIEW_URL = "https://preview.contentful.com";

const isPreview = !(process.env && process.env.ENV === "production");
const requestData = {
  url: isPreview ? PREVIEW_URL : BASE_URL,
  spaceId: "8wfmqgu10mnd",
  environmentId: "master",
  accessToken: isPreview
    ? "Q94R5hLqW3kWK-VS5c4Yjn3mO8u5RNZrh965JY0sRmM"
    : "Dd6TfLSKZjDyLQrMjJ41BGJF7dhyn1bdfBO1iS8154U",
};

const getData = (data, contentType, field) => {
  if (!data && !(contentType || (field && field.type && field.value))) return;

  const newData =
    !!data &&
    !!data.items &&
    data.items.find(
      (item) =>
        (!contentType ||
          (item &&
            item.sys &&
            item.sys.contentType &&
            item.sys.contentType.sys &&
            item.sys.contentType.sys.id &&
            item.sys.contentType.sys.id === contentType)) &&
        (!(field && field.type && field.value) ||
          item.fields[field.type] === field.value)
    );

  return !!newData && newData.fields;
};

const getAllData = async () => {
  let result;
  await fetch(
    `${requestData.url}/spaces/${requestData.spaceId}/environments/${requestData.environmentId}/entries?access_token=${requestData.accessToken}&include=10`
  )
    .then((response) => response.json())
    .then(
      (response) => {
        result = response;
      },
      (error) => console.error(error)
    );
  return result;
};

exports.createPages = async ({ actions: { createPage } }) => {
  const allData = await getAllData();

  const data = allData;
  const pageData = getData(allData, "landingPage");
  const metaData = getData(allData, "metaData");
  const headerMenuData = getData(allData, "menu", {
    type: "menuType",
    value: "header menu",
  });
  const headerMenuItems = headerMenuData && headerMenuData.menuItems;
  const socialMenuData = getData(allData, "menu", {
    type: "menuType",
    value: "social menu",
  });
  const socialMenuItems = socialMenuData && socialMenuData.menuItems;

  createPage({
    path: `/`,
    component: require.resolve(`./src/templates/index.js`),
    context: {
      data,
      pageData,
      metaData,
      headerMenuItems,
      socialMenuItems,
    },
  });
};

/**
 * Put new pages in ./dist folder
 */
exports.onPreInit = () => {
  if (process.argv[2] === "build") {
    //   Remove ./dist
    if (fs.existsSync("./dist"))
      fs.rmdirSync(path.join(__dirname, "dist"), { recursive: true });

    // //   Remove ./.cache
    // if (fs.existsSync("./.cache"))
    //   fs.rmdirSync(path.join(__dirname, ".cache"), { recursive: true });

    //   Move ./public to ./public_dev
    if (!fs.existsSync("./public_dev"))
      fs.renameSync(
        path.join(__dirname, "public"),
        path.join(__dirname, "public_dev")
      );
  }
};

exports.onPostBuild = () => {
  // Move ./public to ./dist
  fs.renameSync(path.join(__dirname, "public"), path.join(__dirname, "dist"));

  //   Move ./public_dev to ./public
  fs.renameSync(
    path.join(__dirname, "public_dev"),
    path.join(__dirname, "public")
  );
};
