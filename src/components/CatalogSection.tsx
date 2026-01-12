import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/hooks/useProducts";
import { useSettings, calculateSellPrice } from "@/hooks/useSettings";

const CatalogSection = () => {
  const { t } = useLanguage();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: settings, isLoading: settingsLoading } = useSettings();

  const isLoading = productsLoading || settingsLoading;
  const nbkRate = settings?.nbk_rate ?? 41340;
  const marginSell = settings?.margin_sell ?? 3.0;
  const pricePerGram = calculateSellPrice(nbkRate, marginSell);

  const getWhatsAppLink = (weight: number, price: number) => {
    const message = encodeURIComponent(
      `Здравствуйте! Интересует слиток ${weight}г за ${price.toLocaleString('ru-RU')} ₸. Подскажите по наличию.`
    );
    return `https://wa.me/77273122140?text=${message}`;
  };

  return (
    <section id="catalog" className="py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-3 md:mb-4">
            {t.catalogTitle} <span className="text-gold-gradient">слитков</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto">
            {t.catalogSubtitle}
          </p>
        </div>

        {/* Catalog Grid - 2 columns on mobile, 5 on desktop */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="catalog-card p-4 md:p-6 animate-pulse">
                <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-muted" />
                <div className="h-5 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-2/3 mx-auto mb-4" />
                <div className="h-8 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            {products?.map((product) => {
              const price = pricePerGram * product.weight;
              return (
                <div key={product.id} className="catalog-card group p-4 md:p-6">
                  {/* Gold Bar Visual */}
                  <div className="gold-bar-icon w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6">
                    <span className="text-background font-bold text-xs md:text-base">
                      {product.weight}g
                    </span>
                  </div>

                  {/* Weight Label */}
                  <h3 className="font-serif text-base md:text-xl font-semibold text-foreground mb-1">
                    {product.weight} {t.grams}
                  </h3>

                  {/* Dimensions */}
                  <p className="text-[10px] md:text-xs text-muted-foreground mb-1">
                    {product.length} x {product.width} мм
                  </p>

                  {/* Purity */}
                  <p className="text-[10px] md:text-xs text-gold/70 mb-3 md:mb-4">
                    {t.purity} {product.purity}
                  </p>

                  {/* Price */}
                  <p className="text-lg md:text-2xl font-bold text-gold mb-3 md:mb-6">
                    {price.toLocaleString('ru-RU')}
                    <span className="text-xs md:text-sm text-gold/70 ml-1">₸</span>
                  </p>

                  {/* WhatsApp Button */}
                  <a 
                    href={getWhatsAppLink(product.weight, price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-gold-soft text-xs md:text-sm py-2 md:py-2.5 flex items-center justify-center gap-2 group-hover:bg-gold/20"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>{t.reserve}</span>
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Trust Note */}
        <p className="text-center text-xs md:text-sm text-muted-foreground mt-8 md:mt-12">
          {t.certifiedDesc}
        </p>
      </div>
    </section>
  );
};

export default CatalogSection;
