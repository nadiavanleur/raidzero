/**
 * Don't use optional chaining (?.), gatsby-build does not support it
 * */

import React from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import Menu from "../components/Menu";
import calculateFooterEmbedHeight from "../helpers/calculateFooterEmbedHeight";

const LandingPage = ({
  pageContext: {
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
    process,
  },
}) => {
  return (
    <>
      <Helmet
        style={[
          {
            cssText: [
              //   Theme CSS
              ...(metaData && metaData.theme && metaData.theme === "dark"
                ? [
                    `
                        :root {
                            --c-accent-color: var(--c-white);
                            --c-accent-color-transparent: var(--c-white-transparent);
                            --c-background-color: var(--c-dark-gray);
                            --c-background-color-transparent: var(--c-dark-gray-transparent);
                        }
                    `,
                  ]
                : []),
              //   Custom CSS
              ...(metaData && metaData.customCss ? [metaData.customCss] : []),
            ].join("\n\n/*\n *\n *\n *\n *\n */\n\n"),
          },
        ]}
      >
        {/* Title */}
        {!!((pageData && pageData.title) || (metaData && metaData.title)) && (
          <title>
            {(
              (pageData && pageData.title) ||
              (metaData && metaData.title)
            ).substring(0, 60)}
          </title>
        )}

        {/* Description */}
        {!!(
          (pageData && pageData.metaDescription) ||
          (metaData && metaData.description)
        ) && (
          <meta
            name="description"
            content={(
              (pageData && pageData.metaDescription) ||
              (metaData && metaData.description)
            ).substring(0, 160)}
          />
        )}

        {/* Theme color */}
        {!!(metaData && metaData.themeColor) && (
          <meta name="theme-color" content={metaData.themeColor} />
        )}

        {/* Favicon */}
        {!!favicon && (
          <link href={favicon} rel="shortcut icon" type="image/x-icon" />
        )}
        {!!favicon && <link href={favicon} rel="icon" />}
        {!!favicon && <link href={favicon} rel="icon" type="image/svg+xml" />}
        {!!favicon && <link href={favicon} rel="apple-touch-icon" />}

        {/* Facebook */}
        <meta
          property="og:url"
          content={
            typeof window !== "undefined" &&
            !!window &&
            !!window.location &&
            window.location.href
          }
        />
        <meta property="og:type" content="website" />
        {!!((pageData && pageData.title) || (metaData && metaData.title)) && (
          <meta
            property="og:title"
            content={(
              (pageData && pageData.title) ||
              (metaData && metaData.title)
            ).substring(0, 60)}
          />
        )}
        {!!(
          (pageData && pageData.metaDescription) ||
          (metaData && metaData.description)
        ) && (
          <meta
            property="og:description"
            content={(
              (pageData && pageData.metaDescription) ||
              (metaData && metaData.description)
            ).substring(0, 160)}
          />
        )}
        {!!((pageData && pageData.image) || avatar) && (
          <meta
            property="og:image"
            content={(pageData && pageData.image) || avatar}
          />
        )}

        {/* Twitter */}
        {!!(pageData && pageData.metaDescription) && (
          <meta
            name="twitter:card"
            content={pageData && pageData.metaDescription}
          />
        )}
        <meta
          property="twitter:domain"
          content={
            typeof window !== "undefined" &&
            !!window &&
            !!window.location &&
            window.location.hostname
          }
        />
        <meta
          property="twitter:url"
          content={
            typeof window !== "undefined" &&
            !!window &&
            !!window.location &&
            window.location.href
          }
        />
        {!!((pageData && pageData.title) || (metaData && metaData.title)) && (
          <meta
            name="twitter:title"
            content={(
              (pageData && pageData.title) ||
              (metaData && metaData.title)
            ).substring(0, 60)}
          />
        )}
        {!!(metaData && metaData.description) && (
          <meta
            name="twitter:description"
            content={(metaData && metaData.description).substring(0, 160)}
          />
        )}
        {!!((pageData && pageData.image) || avatar) && (
          <meta
            name="twitter:image"
            content={(pageData && pageData.image) || avatar}
          />
        )}
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
                    alt={(pageData && pageData.title) || ""}
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
                    alt={(pageData && pageData.title) || ""}
                    className="c-main__logo"
                  />
                )}
              </h1>
              {!!(pageData && pageData.description) && (
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

        {!!(metaData && metaData.footerEmbedUrl) && (
          <footer className="c-footer">
            <iframe
              title={`${(metaData && metaData.title) || ""} embed`}
              src={metaData && metaData.footerEmbedUrl}
              width="100%"
              height={calculateFooterEmbedHeight(
                metaData && metaData.footerEmbedUrl
              )}
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="c-footer__player"
            ></iframe>
          </footer>
        )}
      </div>

      {/* Google structured data */}
      {!!(
        typeof process !== "undefined" &&
        process.env &&
        process.env.WEBSITE_HOST
      ) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: process.env.WEBSITE_HOST,
              ...(logoIconBlack || logoIconWhite
                ? { logo: logoIconBlack || logoIconWhite }
                : {}),
              ...(metaData.metaTitle ? { name: metaData.metaTitle } : {}),
              ...(metaData.email ? { email: metaData.email } : {}),
              ...(metaData.foundingDate
                ? { foundingDate: metaData.foundingDate }
                : {}),
              ...(metaData.knowsAbout
                ? { knowsAbout: metaData.knowsAbout }
                : {}),
              ...(metaData.location
                ? {
                    location: metaData.location,
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: metaData.location,
                    },
                  }
                : {}),
              ...(metaData.slogan ? { slogan: metaData.slogan } : {}),
              ...(metaData.telephone ? { telephone: metaData.telephone } : {}),
              ...(metaData.email || metaData.telephone
                ? {
                    contactPoint: [
                      {
                        "@type": "ContactPoint",
                        telephone: metaData.telephone,
                        email: metaData.email,
                        contactType: metaData.contactType || "contact",
                      },
                    ],
                  }
                : {}),
              ...(metaData.alternateName
                ? { alternateName: metaData.alternateName }
                : {}),
              ...(metaData.description
                ? { description: metaData.description }
                : {}),
              ...(avatar ? { image: avatar } : {}),
              ...(metaData.sameAs ? { sameAs: metaData.sameAs } : {}),
              ...(metaData.brandName && metaData.brandUrl
                ? {
                    brand: {
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      url: metaData.brandUrl,
                      name: metaData.brandName,
                      contactPoint: [
                        ...(metaData.brandEmail || metaData.brandTelephone
                          ? [
                              {
                                "@type": "ContactPoint",
                                telephone: metaData.brandTelephone,
                                email: metaData.brandEmail,
                                contactType:
                                  metaData.brandContactType || "contact",
                              },
                            ]
                          : []),
                      ],
                    },
                  }
                : {}),
            }),
          }}
        />
      )}
    </>
  );
};

export default LandingPage;
