import React, { useState, useEffect } from "react";
import { CoinIconProp } from "../../utils/interfaces";

const CoinIcon = ({ src, alt } : CoinIconProp) => {
  const [imageSrc, setImageSrc] = useState<string>(
    `https://assets.coincap.io/assets/icons/${src?.toLowerCase()}@2x.png`
  );

  useEffect(() => {
    setImageSrc(`https://assets.coincap.io/assets/icons/${src?.toLowerCase()}@2x.png`);
  }, [src]);

  const handleError = () => {
    setImageSrc("https://www.coincap.io/static/logo_mark.png");
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      width="50"
      height="50"
      style={{ objectFit: "cover" }}
    />
  );
};

export default CoinIcon;
