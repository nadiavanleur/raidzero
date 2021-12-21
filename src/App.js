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
 * Get space
 * GET /spaces/{space_id}?access_token={access_token}
 *
 * Get entries
 * GET /spaces/{space_id}/environments/{environment_id}/entries?access_token={access_token}
 *
 * Get maximum include depth
 * &include=10
 */

const App = () => {
  const [data, setData] = useState({});
  const [pageData, setPageData] = useState({});
  const [metaData, setMetaData] = useState({});
  const [headerMenuItems, setHeaderMenuItems] = useState([]);
  const [socialMenuItems, setSocialMenuItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://cdn.contentful.com/spaces/8wfmqgu10mnd/environments/master/entries?access_token=Dd6TfLSKZjDyLQrMjJ41BGJF7dhyn1bdfBO1iS8154U&include=10"
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

  const background = getAsset(data, metaData?.backgroundImage?.sys?.id);
  const avatar = getAsset(data, metaData?.avatar?.sys?.id);
  const logoIcon = getAsset(data, metaData?.logoIcon?.sys?.id);
  const logoText = getAsset(data, metaData?.logoText?.sys?.id);

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
        {!!metaData?.favicon && (
          <>
            <link
              href={metaData.favicon}
              rel="shortcut icon"
              type="image/x-icon"
            />
            <link rel="icon" href={metaData.favicon} />
            <link rel="apple-touch-icon" href={metaData.favicon} />
          </>
        )}
        {!!metaData?.manifest && (
          <link rel="manifest" href={metaData.manifest} />
        )}
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
                {!!logoIcon?.file?.url && (
                  <img
                    src={logoIcon.file.url}
                    alt={pageData?.title || ""}
                    className="c-nav__icon"
                  />
                )}
              </li>
            </Menu>
          </header>
          <main className="c-main">
            {!!avatar?.file?.url && (
              <img
                src={avatar.file.url}
                alt="Artist avatar"
                className="c-main__avatar"
              />
            )}
            <div className="c-main__content">
              <h1 className="c-main__title">
                {!!logoText?.file?.url && (
                  <img
                    src={logoText.file.url}
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
          {!!background?.file?.url && (
            <img
              src={background.file.url}
              alt=""
              className="c-body__background"
            />
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
