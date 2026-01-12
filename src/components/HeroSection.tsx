import { ArrowDown, TrendingDown, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings, calculateBuyPrice, calculateSellPrice } from "@/hooks/useSettings";

const HeroSection = () => {
  const { t } = useLanguage();
  const { data: settings, isLoading } = useSettings();

  const nbkRate = settings?.nbk_rate ?? 41340;
  const buyRate = calculateBuyPrice(nbkRate, settings?.margin_buy ?? 2.5);
  const sellRate = calculateSellPrice(nbkRate, settings?.margin_sell ?? 3.0);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 md:pt-24 pb-16 px-4 md:px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />
      
      {/* Subtle Gold Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6 md:mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse-soft" />
          <span className="text-xs md:text-sm text-gold">{t.locationBadge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 leading-tight">
          {t.headline1} <br className="hidden sm:block" />
          <span className="text-gold-gradient">{t.headline2}</span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 px-4">
          {t.heroSubtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 md:mb-16 px-4">
          <a href="#catalog" className="btn-gold-soft inline-flex items-center gap-2 text-sm md:text-base">
            {t.viewCatalog}
            <ArrowDown className="w-4 h-4" />
          </a>
          <a 
            href="https://wa.me/77273122140" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline-light inline-flex items-center gap-2 text-sm md:text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* NBK Reference Rate */}
        <div className="nbk-rate-bar mb-6 md:mb-8">
          <span>{t.nbkRate}</span>
          <span className="font-medium">
            {isLoading ? '...' : nbkRate.toLocaleString('ru-RU')} ₸/г
          </span>
          <span className="text-xs">• {t.reference}</span>
        </div>

        {/* Rate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto px-4">
          {/* We Buy Card */}
          <div className="glass-card-teal p-6 md:p-8">
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-teal" />
              <span className="text-xs md:text-sm font-medium text-teal uppercase tracking-wider">
                {t.weBuy}
              </span>
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-teal-gradient mb-2">
              {isLoading ? '...' : buyRate.toLocaleString('ru-RU')}
              <span className="text-xl md:text-2xl text-teal/70 ml-1">₸</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">{t.perGram}</p>
          </div>

          {/* We Sell Card */}
          <div className="glass-card-gold p-6 md:p-8">
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-gold" />
              <span className="text-xs md:text-sm font-medium text-gold uppercase tracking-wider">
                {t.weSell}
              </span>
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gold-gradient mb-2">
              {isLoading ? '...' : sellRate.toLocaleString('ru-RU')}
              <span className="text-xl md:text-2xl text-gold/70 ml-1">₸</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">{t.perGram}</p>
          </div>
        </div>

        {/* Availability Status */}
        <div className="mt-6 md:mt-8">
          <div className="status-available">
            <span className="status-dot" />
            <span className="text-xs md:text-sm">{t.inStock}</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
