const background = /* groq */ ` // used as template for background component in sanity
  name,
  backgroundMode,
  imageBackgroundType,
  colorWithDarkMode,
  colorList,
  "colors": colorList[]-> {
    "lightColor": lightColor{
      "rgb": rgb,
      "alpha": alpha,
      "hex": hex
    },
    "darkColor": darkColor{
      "rgb": rgb,
      "alpha": alpha,
      "hex": hex
    },
    colorBackground1Position
  },
  directionDeg,
  "layer" : backgroundLayer -> value,
  responsiveHeight,
  invertLayoutMobile,
  invertLayoutDesk
`;

export const componentFields = /* groq */ ` // used as template for component in sanity
  _key,
  isActive,
  typeComponent,
  "typeComponentValue": typeComponent->value,
  variant,
  imageBackground,
  'backgroundValue': background-> { ${background}},
  content,
  ctaLinkBanner,
  PTextBanner,
  imageContent,
  imagePosition,
  videoUrl,
  videoType,
  layoutItems,
  PTextItem,
  resources,
  items[isActive == true]  | order(orderRank asc) {
    _key,
    isActive,
    image,
    icon,
    svgIcon,
    svgIconList,
    "alt": coalesce(image.alt, alt),
    content,
    ctaLinkItem,
  }
`;
