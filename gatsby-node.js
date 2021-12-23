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
const IS_PREVIEW = false;
const requestData = {
  url: IS_PREVIEW ? PREVIEW_URL : BASE_URL,
  spaceId: process.env.SPACE_ID,
  environmentId: process.env.ENVIRONMENT_ID,
  accessToken: IS_PREVIEW
    ? process.env.ACCESS_TOKEN_PREVIEW
    : process.env.ACCESS_TOKEN_LIVE,
};

const getAsset = (data, id) => {
  if (
    !(
      data &&
      data.includes &&
      data.includes.Asset &&
      data.includes.Asset.length
    ) ||
    !id
  )
    return;

  const newData = data.includes.Asset.find((item) => item.sys.id === id);

  return !!newData && newData.fields;
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

const getFileUrl = (name, data, metaData) => {
  const asset = getAsset(
    data,
    metaData && metaData[name] && metaData[name].sys && metaData[name].sys.id
  );
  return !!asset && !!asset.file && `https:${asset.file.url}`;
};

exports.createPages = async ({ actions: { createPage } }) => {
  const allData = await getAllData();

  const data = await allData;
  const pageData = getData(allData, "landingPage");
  const metaData = await getData(allData, "metaData");
  const themeIsLight = (metaData.theme || "light") === "light";
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
  const background = getFileUrl("backgroundImage", data, metaData);
  const favicon = getFileUrl("favicon", data, metaData);
  const avatar = getFileUrl("avatar", data, metaData);
  const logoIconBlack = getFileUrl("logoIconBlack", data, metaData);
  const logoIconWhite = getFileUrl("logoIconWhite", data, metaData);
  const logoIcon = themeIsLight ? logoIconBlack : logoIconWhite;
  const logoTextBlack = getFileUrl("logoTextBlack", data, metaData);
  const logoTextWhite = getFileUrl("logoTextWhite", data, metaData);
  const logoText = themeIsLight ? logoTextBlack : logoTextWhite;

  createPage({
    path: `/`,
    component: require.resolve(`./src/templates/index.js`),
    context: {
      data,
      pageData,
      metaData,
      headerMenuItems,
      socialMenuItems,
      background,
      favicon,
      avatar,
      logoIcon,
      logoIconBlack,
      logoIconWhite,
      logoText,
      logoTextBlack,
      logoTextWhite,
      process: {
        env: process.env,
      },
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
