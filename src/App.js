import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import Menu from "./components/Menu";
import calculateFooterEmbedHeight from "./helpers/calculateFooterEmbedHeight";
import getData, { getAsset } from "./helpers/getData";

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
const BASE_URL = "https://cdn.contentful.com";
const PREVIEW_URL = "https://preview.contentful.com";

const App = () => {
  const [data, setData] = useState({});
  const [pageData, setPageData] = useState({});
  const [metaData, setMetaData] = useState({});
  const [headerMenuItems, setHeaderMenuItems] = useState([]);
  const [socialMenuItems, setSocialMenuItems] = useState([]);

  useEffect(() => {
    const isPreview = !window?.location?.host?.includes("preview");
    const requestData = {
      url: isPreview ? PREVIEW_URL : BASE_URL,
      spaceId: "8wfmqgu10mnd",
      environmentId: "master",
      accessToken: isPreview
        ? "Q94R5hLqW3kWK-VS5c4Yjn3mO8u5RNZrh965JY0sRmM"
        : "Dd6TfLSKZjDyLQrMjJ41BGJF7dhyn1bdfBO1iS8154U",
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
    <>
      <Helmet>
        {!!(metaData?.title || pageData?.title) && (
          <title>{metaData?.title || pageData?.title}</title>
        )}
        {!!(metaData?.description || pageData?.description) && (
          <meta
            name="description"
            content={metaData?.description || pageData?.description}
          />
        )}
        {!!metaData?.themeColor && (
          <meta name="theme-color" content={metaData.themeColor} />
        )}
        {!!favicon && (
          <link href={favicon} rel="shortcut icon" type="image/x-icon" />
        )}
        {!!favicon && <link href={favicon} rel="icon" />}
        {!!favicon && <link href={favicon} rel="apple-touch-icon" />}
        {!!metaData?.customCss && <style>{metaData.customCss}</style>}
      </Helmet>

      <div className="c-body">
        <div className="c-body__inner">
          <header className="c-header">
            <Menu
              items={headerMenuItems}
              data={data}
              extraClasses="c-nav--header"
            >
              <li className="c-nav__list-item">
                {!!logoIcon && (
                  <img
                    src={logoIcon}
                    alt={pageData?.title || ""}
                    className="c-nav__icon"
                  />
                )}
              </li>
            </Menu>
          </header>
          <main className="c-main">
            {!!avatar && (
              <img
                src={avatar}
                alt="Artist avatar"
                className="c-main__avatar"
              />
            )}
            <div className="c-main__content">
              <h1 className="c-main__title">
                {!!logoText && (
                  <img
                    src={logoText}
                    alt={pageData?.title || ""}
                    className="c-main__logo"
                  />
                )}
              </h1>
              {!!pageData?.description && (
                <div className="c-main__description c-editor-content">
                  <ReactMarkdown children={pageData.description} />
                </div>
              )}
            </div>
            <Menu
              data={data}
              items={socialMenuItems}
              extraClasses="c-nav--socials"
            />
          </main>
          {!!background && (
            <img src={background} alt="" className="c-body__background" />
          )}
        </div>

        {!!metaData?.footerEmbedUrl && (
          <footer className="c-footer">
            <iframe
              title={`${metaData?.title || ""} embed`}
              src={metaData?.footerEmbedUrl}
              width="100%"
              height={calculateFooterEmbedHeight(metaData?.footerEmbedUrl)}
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="c-footer__player"
            ></iframe>
          </footer>
        )}
      </div>
    </>
  );
};

export default App;
