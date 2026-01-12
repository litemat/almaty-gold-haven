import { MapPin, Navigation, Phone, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LocationSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-3 md:mb-4">
            {t.contactTitle} <span className="text-gold-gradient">с нами</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Contact Card */}
        <div className="glass-card p-6 md:p-12 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Map Placeholder */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted/50 border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin className="w-8 h-8 md:w-10 md:h-10 text-gold mx-auto mb-3" />
                  <p className="text-xs md:text-sm text-muted-foreground">Интерактивная карта</p>
                </div>
              </div>
              {/* Map Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)"/>
                </svg>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1 text-sm md:text-base">{t.officeAddress}</p>
                  <p className="text-muted-foreground text-sm">г. Алматы, пр. Абая 150, офис 312</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1 text-sm md:text-base">{t.phone}</p>
                  <a href="tel:+77273122140" className="block text-gold hover:text-gold-light transition-colors text-sm md:text-base">
                    +7 (727) 312-21-40
                  </a>
                  <a href="tel:+77273281367" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                    +7 (727) 328-13-67
                  </a>
                </div>
              </div>

              {/* 2GIS Button */}
              <a 
                href="https://2gis.kz/almaty/search/%D0%BF%D1%80.%20%D0%90%D0%B1%D0%B0%D1%8F%20150"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-teal-soft flex items-center justify-center gap-3 py-3 md:py-4"
              >
                <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">{t.open2GIS}</span>
              </a>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <a 
                  href="https://wa.me/77273122140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-soft flex items-center justify-center gap-2 py-2.5 md:py-3"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm">WhatsApp</span>
                </a>
                <a 
                  href="https://maps.google.com/?q=Almaty+Abay+150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-light flex items-center justify-center gap-2 py-2.5 md:py-3"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm">{t.openGoogleMaps}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
