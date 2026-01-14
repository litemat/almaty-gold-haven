import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GlobalSettings {
  id: string;
  nbk_rate: number;
  margin_buy: number;
  margin_sell: number;
  buy_price: number | null;
  sell_price: number | null;
  hero_banner_url: string | null;
  updated_at: string;
}

export const useSettings = () => {
  return useQuery({
    queryKey: ['global-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('global_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      // Return default values if no settings found
      if (!data) {
        const defaultNbkRate = 41340;
        const defaultMarginBuy = 2.5;
        const defaultMarginSell = 3.0;
        return {
          id: '',
          nbk_rate: defaultNbkRate,
          margin_buy: defaultMarginBuy,
          margin_sell: defaultMarginSell,
          buy_price: calculateBuyPrice(defaultNbkRate, defaultMarginBuy),
          sell_price: calculateSellPrice(defaultNbkRate, defaultMarginSell),
          hero_banner_url: null,
          updated_at: new Date().toISOString(),
        } as GlobalSettings;
      }

      return data as GlobalSettings;
    },
    staleTime: 30000, // 30 seconds
  });
};

export const calculateBuyPrice = (nbkRate: number, marginBuy: number) => {
  return Math.round(nbkRate * (1 - marginBuy / 100));
};

export const calculateSellPrice = (nbkRate: number, marginSell: number) => {
  return Math.round(nbkRate * (1 + marginSell / 100));
};

// Calculate margin from final buy price
export const calculateMarginFromBuyPrice = (nbkRate: number, buyPrice: number) => {
  if (nbkRate === 0) return 0;
  return Math.round(((nbkRate - buyPrice) / nbkRate) * 100 * 100) / 100; // Round to 2 decimal places
};

// Calculate margin from final sell price
export const calculateMarginFromSellPrice = (nbkRate: number, sellPrice: number) => {
  if (nbkRate === 0) return 0;
  return Math.round(((sellPrice - nbkRate) / nbkRate) * 100 * 100) / 100; // Round to 2 decimal places
};

// Get buy price with priority: use stored buy_price if available, otherwise calculate from margin
export const getBuyPrice = (settings: GlobalSettings | undefined) => {
  if (!settings) return 0;
  if (settings.buy_price !== null && settings.buy_price !== undefined) {
    return settings.buy_price;
  }
  return calculateBuyPrice(settings.nbk_rate, settings.margin_buy);
};

// Get sell price with priority: use stored sell_price if available, otherwise calculate from margin
export const getSellPrice = (settings: GlobalSettings | undefined) => {
  if (!settings) return 0;
  if (settings.sell_price !== null && settings.sell_price !== undefined) {
    return settings.sell_price;
  }
  return calculateSellPrice(settings.nbk_rate, settings.margin_sell);
};
