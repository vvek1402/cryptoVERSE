import create from 'zustand';

interface PriceData {
  [key: string]: string;
}

interface CryptoStore {
  prices: PriceData;
  loading: boolean;
  connect: (assets: string[]) => void;
}

export const useCryptoStore = create<CryptoStore>((set) => ({
  prices: {},
  loading: true,

  connect: (assets: string[]) => {
    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets.join(',')}`);

    socket.onopen = () => {
      set({ loading: false });
    };

    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      set((state) => ({
        prices: { ...state.prices, ...data },
      }));
    };

    socket.onclose = () => {
      set({ loading: true });
    };
  },
}));
