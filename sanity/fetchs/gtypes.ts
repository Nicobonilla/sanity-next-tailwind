type TypeInfo = {
  [key: string]: {
    type: string;
    optional: boolean;
  };
};

function getTypeInfo(obj: any): TypeInfo {
  const result: TypeInfo = {};
  for (const key in obj) {
    const value = obj[key];
    result[key] = {
      type: typeof value,
      optional: value === undefined || value === null,
    };
  }
  return result;
}

export function compareTypes(
  sanityType: any,
  customType: any
): {
  missingInSanity: string[];
  missingInCustom: string[];
  typeMismatches: { [key: string]: { sanity: string; custom: string } };
} {
  const sanityTypeInfo = getTypeInfo(sanityType);
  const customTypeInfo = getTypeInfo(customType);

  const missingInSanity = Object.keys(customTypeInfo).filter(
    (key) => !(key in sanityTypeInfo)
  );
  const missingInCustom = Object.keys(sanityTypeInfo).filter(
    (key) => !(key in customTypeInfo)
  );
  const typeMismatches: { [key: string]: { sanity: string; custom: string } } =
    {};

  for (const key in sanityTypeInfo) {
    if (key in customTypeInfo) {
      if (sanityTypeInfo[key].type !== customTypeInfo[key].type) {
        typeMismatches[key] = {
          sanity: sanityTypeInfo[key].type,
          custom: customTypeInfo[key].type,
        };
      }
    }
  }

  return { missingInSanity, missingInCustom, typeMismatches };
}
