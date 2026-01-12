import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
              <span className="text-background font-serif font-bold text-lg">A</span>
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">
              Altyn Invest
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-muted-foreground hover:text-foreground transition-colors">
              Каталог
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              О нас
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Контакты
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">RU</span>
              <span className="text-border">|</span>
              <span className="text-muted-foreground/50">KZ</span>
            </div>
            <a 
              href="tel:+77771234567" 
              className="hidden sm:flex items-center gap-2 btn-gold-soft text-sm py-2 px-4"
            >
              <Phone className="w-4 h-4" />
              <span>+7 777 123 4567</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
