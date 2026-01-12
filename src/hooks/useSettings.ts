import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GlobalSettings {
  id: string;
  nbk_rate: number;
  margin_buy: number;
  margin_sell: number;
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
        return {
          id: '',
          nbk_rate: 41340,
          margin_buy: 2.5,
          margin_sell: 3.0,
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
