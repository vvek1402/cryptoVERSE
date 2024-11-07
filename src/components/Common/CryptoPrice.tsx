import React, { useEffect } from "react";
import { useCryptoStore } from "../../store/pricesocket.store";
import { formatValueTwoDigit } from "../../utils/helpers";

const CryptoPrice: React.FC<{ assets: string[]; defaultPrice: string }> = ({
  assets,
  defaultPrice,
}) => {
  const { prices, loading, connect } = useCryptoStore();

  useEffect(() => {
    connect(assets);
  }, [assets, connect]);

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <span>
          {assets.map((asset, idx) => (
            <span key={idx}>${prices[asset] ? prices[asset] : formatValueTwoDigit(defaultPrice)}</span>
          ))}
        </span>
      )}
    </>
  );
};

export default CryptoPrice;
