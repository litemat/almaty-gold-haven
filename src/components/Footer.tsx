import { Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-border/50 pb-24 md:pb-8">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col gap-6">
          {/* Top Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
                <span className="text-background font-serif font-bold text-sm">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold text-foreground">
                  Stilo Exchange
                </span>
                <span className="text-[10px] text-muted-foreground">ТОО "Stilo Exchange"</span>
              </div>
            </div>

            {/* License Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/5 border border-gold/20">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-xs text-muted-foreground">{t.license}</span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50">
            {/* Copyright */}
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Stilo Exchange. {t.allRights}
            </p>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground/70 text-center md:text-right">
              {t.pricesInfo}
            </p>

            {/* Admin Link */}
            <Link 
              to="/admin" 
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
