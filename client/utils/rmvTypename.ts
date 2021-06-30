const rmvTypename = (obj: Record<string, any>): Record<string, any> => {
  const newObj = { ...obj };
  delete newObj.__typename;
  return newObj;
};

export default rmvTypename;
