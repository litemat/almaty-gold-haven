import { ArrowDown, TrendingDown, TrendingUp } from "lucide-react";

const HeroSection = () => {
  // Mock data - in production would come from Supabase
  const buyRate = 38943;
  const sellRate = 41340;
  const nbkRate = 39942;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />
      
      {/* Subtle Gold Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse-soft" />
          <span className="text-sm text-gold">Алматы, Казахстан</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 leading-tight">
          Сохраните ценность <br />
          <span className="text-gold-gradient">в золоте</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Надёжные инвестиции в драгоценные металлы в Алматы. Прозрачные цены, сертифицированное золото.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="#catalog" className="btn-gold-soft inline-flex items-center gap-2">
            Смотреть каталог
            <ArrowDown className="w-4 h-4" />
          </a>
          <a 
            href="https://wa.me/77771234567" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline-light inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* NBK Reference Rate */}
        <div className="nbk-rate-bar mb-8">
          <span>Курс НБ РК:</span>
          <span className="font-medium">{nbkRate.toLocaleString('ru-RU')} ₸/г</span>
          <span className="text-xs">• Справочно</span>
        </div>

        {/* Rate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* We Buy Card */}
          <div className="glass-card-teal p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal" />
              <span className="text-sm font-medium text-teal uppercase tracking-wider">
                Мы покупаем
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-serif font-bold text-teal-gradient mb-2">
              {buyRate.toLocaleString('ru-RU')}
              <span className="text-2xl text-teal/70 ml-1">₸</span>
            </div>
            <p className="text-sm text-muted-foreground">за грамм</p>
          </div>

          {/* We Sell Card */}
          <div className="glass-card-gold p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium text-gold uppercase tracking-wider">
                Мы продаём
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-2">
              {sellRate.toLocaleString('ru-RU')}
              <span className="text-2xl text-gold/70 ml-1">₸</span>
            </div>
            <p className="text-sm text-muted-foreground">за грамм</p>
          </div>
        </div>

        {/* Availability Status */}
        <div className="mt-8">
          <div className="status-available">
            <span className="status-dot" />
            <span>В наличии — готово к выдаче</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
