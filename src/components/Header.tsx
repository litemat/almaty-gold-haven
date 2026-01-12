import { useState } from 'react';
import { Phone, Menu, X, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
              <span className="text-background font-serif font-bold text-base md:text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-semibold text-foreground leading-tight">
                Stilo Exchange
              </span>
              <span className="text-[10px] text-muted-foreground hidden sm:block">ТОО "Stilo Exchange"</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-muted-foreground hover:text-foreground transition-colors">
              {t.catalog}
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t.about}
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              {t.contacts}
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <div className="flex items-center rounded-full bg-muted/50 p-1">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  language === 'ru' 
                    ? 'bg-gold text-background' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('kz')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  language === 'kz' 
                    ? 'bg-gold text-background' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                KZ
              </button>
            </div>

            {/* Desktop Phone */}
            <div className="hidden lg:flex flex-col items-end text-xs">
              <a href="tel:+77273122140" className="text-gold hover:text-gold-light transition-colors font-medium">
                +7 (727) 312-21-40
              </a>
              <a href="tel:+77273281367" className="text-muted-foreground hover:text-foreground transition-colors">
                +7 (727) 328-13-67
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-muted/50"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-4 space-y-4">
            <a 
              href="#catalog" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-foreground"
            >
              {t.catalog}
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-foreground"
            >
              {t.about}
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-foreground"
            >
              {t.contacts}
            </a>
            <div className="pt-4 border-t border-border space-y-2">
              <a href="tel:+77273122140" className="flex items-center gap-2 text-gold">
                <Phone className="w-4 h-4" />
                +7 (727) 312-21-40
              </a>
              <a href="tel:+77273281367" className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                +7 (727) 328-13-67
              </a>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4 text-gold" />
                <span>{t.license}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
