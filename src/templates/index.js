/**
 * Don't use optional chaining (?.), gatsby-build does not support it
 * */

import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout";
import Menu from "../components/Menu";

const LandingPage = ({ pageContext }) => {
  const { data, pageData, socialMenuItems, avatar, logoText } = pageContext;

  return (
    <Layout pageContext={pageContext}>
      {!!avatar && (
        <img src={avatar} alt="Artist avatar" className="c-main__avatar" />
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
      <Menu data={data} items={socialMenuItems} extraClasses="c-nav--socials" />
    </Layout>
  );
};

export default LandingPage;
