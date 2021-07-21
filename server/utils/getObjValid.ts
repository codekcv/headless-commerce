/**
 * Remove entries with undefined values in an object.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getObjTruth = (obj: Record<string, any>): Record<string, any> => {
  const buildValidObj: typeof obj = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) buildValidObj[key] = value;
  });

  return buildValidObj;
};

export default getObjTruth;
