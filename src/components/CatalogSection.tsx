import { ShoppingBag } from "lucide-react";

const goldBars = [
  { weight: 5, price: 206700 },
  { weight: 10, price: 413400 },
  { weight: 20, price: 826800 },
  { weight: 50, price: 2067000 },
  { weight: 100, price: 4134000 },
];

const CatalogSection = () => {
  return (
    <section id="catalog" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Каталог <span className="text-gold-gradient">слитков</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Выберите подходящий размер инвестиции
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {goldBars.map((bar) => (
            <div key={bar.weight} className="catalog-card group">
              {/* Gold Bar Visual */}
              <div className="gold-bar-icon w-16 h-16 md:w-20 md:h-20 mx-auto mb-6">
                <span className="text-background font-bold text-sm md:text-base">
                  {bar.weight}g
                </span>
              </div>

              {/* Weight Label */}
              <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-2">
                {bar.weight} грамм
              </h3>

              {/* Price */}
              <p className="text-xl md:text-2xl font-bold text-gold mb-6">
                {bar.price.toLocaleString('ru-RU')}
                <span className="text-sm text-gold/70 ml-1">₸</span>
              </p>

              {/* Soft CTA Button */}
              <button className="w-full btn-gold-soft text-sm py-2.5 flex items-center justify-center gap-2 group-hover:bg-gold/20">
                <ShoppingBag className="w-4 h-4" />
                <span>Забронировать</span>
              </button>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          Все слитки имеют пробу 999.9 и сертификаты подлинности
        </p>
      </div>
    </section>
  );
};

export default CatalogSection;
