import { Award, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Сертифицированное золото",
    description: "Все слитки имеют пробу 999.9 с полным пакетом документов",
  },
  {
    icon: Shield,
    title: "Безопасные сделки",
    description: "Гарантия и прозрачное оформление каждой операции",
  },
  {
    icon: TrendingUp,
    title: "Лучшие цены",
    description: "Минимальные наценки и честный курс обмена",
  },
];

const WhyUsSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Почему <span className="text-gold-gradient">выбирают нас</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
