const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
              <span className="text-background font-serif font-bold text-sm">A</span>
            </div>
            <span className="font-serif text-lg font-semibold text-foreground">
              Altyn Invest
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} Altyn Invest Almaty. Все права защищены.
          </p>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/70">
            Цены носят информационный характер
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
