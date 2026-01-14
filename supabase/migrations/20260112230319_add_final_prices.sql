-- Add buy_price and sell_price columns to global_settings table
ALTER TABLE public.global_settings
ADD COLUMN buy_price DECIMAL(10, 2),
ADD COLUMN sell_price DECIMAL(10, 2);

-- Update existing records: calculate final prices from current margins
UPDATE public.global_settings
SET 
  buy_price = ROUND(nbk_rate * (1 - margin_buy / 100), 2),
  sell_price = ROUND(nbk_rate * (1 + margin_sell / 100), 2)
WHERE buy_price IS NULL OR sell_price IS NULL;
