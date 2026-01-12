import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'kz';

interface Translations {
  // Header
  catalog: string;
  about: string;
  contacts: string;
  
  // Hero
  locationBadge: string;
  headline1: string;
  headline2: string;
  heroSubtitle: string;
  viewCatalog: string;
  nbkRate: string;
  reference: string;
  weBuy: string;
  weSell: string;
  perGram: string;
  inStock: string;
  pricePerGram: string;
  
  // Catalog
  catalogTitle: string;
  catalogSubtitle: string;
  grams: string;
  weight: string;
  reserve: string;
  purity: string;
  dimensions: string;
  
  // Why Us
  whyUsTitle: string;
  certifiedTitle: string;
  certifiedDesc: string;
  secureTitle: string;
  secureDesc: string;
  pricesTitle: string;
  pricesDesc: string;
  licensedTitle: string;
  licensedDesc: string;
  
  // Location
  contactTitle: string;
  contactSubtitle: string;
  officeAddress: string;
  phone: string;
  open2GIS: string;
  openGoogleMaps: string;
  call: string;
  
  // Footer
  allRights: string;
  pricesInfo: string;
  license: string;
  
  // Admin
  adminLogin: string;
  email: string;
  password: string;
  login: string;
  logout: string;
  settings: string;
  products: string;
  save: string;
  nbkRateLabel: string;
  buyMargin: string;
  sellMargin: string;
}

const translations: Record<Language, Translations> = {
  ru: {
    catalog: 'Каталог',
    about: 'О нас',
    contacts: 'Контакты',
    locationBadge: 'Алматы, Казахстан',
    headline1: 'Сохраните ценность',
    headline2: 'в золоте',
    heroSubtitle: 'Надёжные инвестиции в драгоценные металлы. Прозрачные цены, лицензированная деятельность.',
    viewCatalog: 'Смотреть каталог',
    nbkRate: 'Курс НБ РК:',
    reference: 'Справочно',
    weBuy: 'Мы покупаем',
    weSell: 'Мы продаём',
    perGram: 'за грамм',
    inStock: 'В наличии — готово к выдаче',
    pricePerGram: 'Цена за 1 грамм',
    catalogTitle: 'Каталог',
    catalogSubtitle: 'Выберите подходящий размер инвестиции',
    grams: 'грамм',
    weight: 'Вес',
    reserve: 'В WhatsApp',
    purity: 'Проба',
    dimensions: 'Размеры',
    whyUsTitle: 'Почему Stilo Exchange',
    certifiedTitle: 'Сертифицированное золото',
    certifiedDesc: 'Все слитки имеют пробу 999.9 и международные сертификаты подлинности',
    secureTitle: 'Безопасные сделки',
    secureDesc: 'Каждая операция оформляется официально с полным пакетом документов',
    pricesTitle: 'Лучшие цены',
    pricesDesc: 'Минимальные спреды и прозрачное ценообразование без скрытых комиссий',
    licensedTitle: 'Лицензированная деятельность',
    licensedDesc: 'Лицензия АГФ НБ РК №7514015 от 19.12.2014',
    contactTitle: 'Свяжитесь',
    contactSubtitle: 'Мы ответим на все ваши вопросы',
    officeAddress: 'Адрес офиса',
    phone: 'Телефон',
    open2GIS: 'Открыть маршрут в 2GIS',
    openGoogleMaps: 'Google Maps',
    call: 'Позвонить',
    allRights: 'Все права защищены.',
    pricesInfo: 'Цены носят информационный характер',
    license: 'Лицензия АГФ НБ РК №7514015 от 19.12.2014',
    adminLogin: 'Вход в панель управления',
    email: 'Email',
    password: 'Пароль',
    login: 'Войти',
    logout: 'Выйти',
    settings: 'Настройки',
    products: 'Продукты',
    save: 'Сохранить',
    nbkRateLabel: 'Курс НБ РК (₸/г)',
    buyMargin: 'Маржа покупки (%)',
    sellMargin: 'Маржа продажи (%)',
  },
  kz: {
    catalog: 'Каталог',
    about: 'Біз туралы',
    contacts: 'Байланыс',
    locationBadge: 'Алматы, Қазақстан',
    headline1: 'Құндылықты сақтаңыз',
    headline2: 'алтынмен',
    heroSubtitle: 'Асыл металдарға сенімді инвестиция. Ашық бағалар, лицензияланған қызмет.',
    viewCatalog: 'Каталогты қарау',
    nbkRate: 'ҚР ҰБ бағамы:',
    reference: 'Анықтама',
    weBuy: 'Біз сатып аламыз',
    weSell: 'Біз сатамыз',
    perGram: 'грамм үшін',
    inStock: 'Қолда бар — беруге дайын',
    pricePerGram: '1 грамм үшін баға',
    catalogTitle: 'Каталог',
    catalogSubtitle: 'Сізге қолайлы инвестиция көлемін таңдаңыз',
    grams: 'грамм',
    weight: 'Салмақ',
    reserve: 'WhatsApp-қа',
    purity: 'Сынама',
    dimensions: 'Өлшемдері',
    whyUsTitle: 'Неге Stilo Exchange',
    certifiedTitle: 'Сертификатталған алтын',
    certifiedDesc: 'Барлық құймалардың сынамасы 999.9 және халықаралық түпнұсқалық сертификаттары бар',
    secureTitle: 'Қауіпсіз мәмілелер',
    secureDesc: 'Әрбір операция толық құжаттамамен ресми түрде рәсімделеді',
    pricesTitle: 'Үздік бағалар',
    pricesDesc: 'Жасырын комиссияларсыз минималды спредтер мен ашық баға белгілеу',
    licensedTitle: 'Лицензияланған қызмет',
    licensedDesc: 'ҚР ҰБ АҚҚ лицензиясы №7514015, 19.12.2014',
    contactTitle: 'Бізбен байланысыңыз',
    contactSubtitle: 'Сұрақтарыңызға жауап береміз',
    officeAddress: 'Кеңсе мекенжайы',
    phone: 'Телефон',
    open2GIS: '2GIS-те маршрут ашу',
    openGoogleMaps: 'Google Maps',
    call: 'Қоңырау шалу',
    allRights: 'Барлық құқықтар қорғалған.',
    pricesInfo: 'Бағалар ақпараттық сипатта',
    license: 'ҚР ҰБ АҚҚ лицензиясы №7514015, 19.12.2014',
    adminLogin: 'Басқару панеліне кіру',
    email: 'Email',
    password: 'Құпия сөз',
    login: 'Кіру',
    logout: 'Шығу',
    settings: 'Баптаулар',
    products: 'Өнімдер',
    save: 'Сақтау',
    nbkRateLabel: 'ҚР ҰБ бағамы (₸/г)',
    buyMargin: 'Сатып алу маржасы (%)',
    sellMargin: 'Сату маржасы (%)',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ru');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
