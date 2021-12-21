export const getEntry = (data, id) => {
  if (!data || !id) return;

  return [...(data?.includes?.Entry || []), ...(data?.items || [])].find(
    (item) => item?.sys?.id === id
  )?.fields;
};

export const getAsset = (data, id) => {
  if (!data?.includes?.Asset?.length || !id) return;

  return data.includes.Asset.find((item) => item?.sys?.id === id)?.fields;
};

const getData = (data, contentType, field) => {
  if (!data && !(contentType || (field?.type && field?.value))) return;

  return data?.items?.find(
    (item) =>
      (!contentType || item.sys?.contentType?.sys?.id === contentType) &&
      (!(field?.type && field?.value) ||
        item.fields[field.type] === field.value)
  )?.fields;
};

export default getData;
