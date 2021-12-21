const calculateFooterEmbedHeight = (url) => {
  const urlParams = new URLSearchParams(url);

  return (
    urlParams.get("size") ||
    (url.includes("soundcloud") && "114") ||
    (url.includes("spotify") && "80")
  );
};
export default calculateFooterEmbedHeight;

/**
 * Soundcloud size can also be set to 162 by adding &size=162 to url in CMS
 */
