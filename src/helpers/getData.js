/**
 * Don't use optional chaingin (?.), gatsby-build does not support it
 * */

export const getEntry = (data, id) => {
  if (!data || !id) return;

  const newData = [
    ...((data && data.includes && data.includes.Entry) || []),
    ...((data && data.items) || []),
  ].find((item) => (item && item.sys && item.sys.id) === id);

  return !!newData && newData.fields;
};

export const getAsset = (data, id) => {
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

export const getFileUrl = (name, data, metaData) => {
  const asset = getAsset(
    data,
    metaData && metaData[name] && metaData[name].sys && metaData[name].sys.id
  );
  return !!asset && !!asset.file && `https:${asset.file.url}`;
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

export default getData;
