import React, { useState, useEffect } from "react";
import { CoinIconProp } from "../../utils/interfaces";
import { Image } from "@mantine/core";

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
    <Image
      src={imageSrc}
      alt={alt}
      onError={handleError}
      w="50"
      h="50"
      fit="contain"
    />
  );
};

export default CoinIcon;
