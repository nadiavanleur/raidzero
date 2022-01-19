/**
 * Don't use optional chaining (?.), gatsby-build does not support it
 * */

import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout";
import Menu from "../components/Menu";

const LandingPage = ({ pageContext }) => {
  const { data, pageData, avatar } = pageContext;

  return (
    <Layout pageContext={pageContext}>
      {!!avatar && (
        <img
          src={avatar}
          alt="Artist avatar"
          className="c-main__avatar c-main__avatar--small"
        />
      )}
      <div className="c-main__content">
        <h1
          className={`c-main__title c-main__title--center${
            !!(pageData && pageData.hideTitle) ? " u-visually-hidden" : ""
          }`}
        >
          {pageData.title}
        </h1>
      </div>
      <Menu data={data} items={pageData.links} extraClasses="c-nav--links" />
    </Layout>
  );
};

export default LandingPage;
