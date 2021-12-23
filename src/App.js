import { useEffect, useState } from "react";
import getData, { getAsset } from "./helpers/getData";
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
  const logoIcon = getAsset(data, metaData?.logoIcon?.sys?.id)?.file?.url;
  const logoText = getAsset(data, metaData?.logoText?.sys?.id)?.file?.url;

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
        logoText,
      }}
    />
  );
};

export default App;
