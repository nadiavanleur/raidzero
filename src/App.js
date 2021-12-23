import { useEffect, useState } from "react";
import getData, { getAsset, getFileUrl } from "./helpers/getData";
import LandingPage from "./templates";

const App = () => {
  const [data, setData] = useState({});
  const [pageData, setPageData] = useState({});
  const [metaData, setMetaData] = useState({});
  const [headerMenuItems, setHeaderMenuItems] = useState([]);
  const [socialMenuItems, setSocialMenuItems] = useState([]);

  useEffect(() => {
    const BASE_URL = "https://cdn.contentful.com";
    const PREVIEW_URL = "https://preview.contentful.com";
    const IS_PREVIEW = true;
    const requestData = {
      url: IS_PREVIEW ? PREVIEW_URL : BASE_URL,
      spaceId: process.env.SPACE_ID,
      environmentId: process.env.ENVIRONMENT_ID,
      accessToken: IS_PREVIEW
        ? process.env.ACCESS_TOKEN_PREVIEW
        : process.env.ACCESS_TOKEN_LIVE,
    };

    fetch(
      `${requestData.url}/spaces/${requestData.spaceId}/environments/${requestData.environmentId}/entries?access_token=${requestData.accessToken}&include=10`
    )
      .then((response) => response.json())
      .then(
        (response) => {
          setData(response);
          setPageData(getData(response, "landingPage"));
          setMetaData(getData(response, "metaData"));
          setHeaderMenuItems(
            getData(response, "menu", {
              type: "menuType",
              value: "header menu",
            })?.menuItems
          );
          setSocialMenuItems(
            getData(response, "menu", {
              type: "menuType",
              value: "social menu",
            })?.menuItems
          );
        },
        (error) => console.error(error)
      );
  }, []);

  const background = getAsset(data, metaData?.backgroundImage?.sys?.id)?.file
    ?.url;
  const favicon = getAsset(data, metaData?.favicon?.sys?.id)?.file?.url;
  const avatar = getAsset(data, metaData?.avatar?.sys?.id)?.file?.url;
  const themeIsLight = (metaData.theme || "light") === "light";
  const logoIconBlack = getFileUrl("logoIconBlack", data, metaData);
  const logoIconWhite = getFileUrl("logoIconWhite", data, metaData);
  const logoIcon = themeIsLight ? logoIconBlack : logoIconWhite;
  const logoTextBlack = getFileUrl("logoTextBlack", data, metaData);
  const logoTextWhite = getFileUrl("logoTextWhite", data, metaData);
  const logoText = themeIsLight ? logoTextBlack : logoTextWhite;

  return (
    <LandingPage
      pageContext={{
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
      }}
    />
  );
};

export default App;
