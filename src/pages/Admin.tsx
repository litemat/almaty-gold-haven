import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSettings } from '@/hooks/useSettings';
import { useProducts } from '@/hooks/useProducts';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { LogOut, Settings, Package, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const { data: products, isLoading: productsLoading } = useProducts();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Settings form state
  const [nbkRate, setNbkRate] = useState('');
  const [marginBuy, setMarginBuy] = useState('');
  const [marginSell, setMarginSell] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (settings) {
      setNbkRate(settings.nbk_rate.toString());
      setMarginBuy(settings.margin_buy.toString());
      setMarginSell(settings.margin_sell.toString());
    }
  }, [settings]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Check if user has admin role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin');

      setIsAuthenticated(roles && roles.length > 0);
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has admin role
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        toast.error('У вас нет прав администратора');
        return;
      }

      setIsAuthenticated(true);
      toast.success('Успешный вход');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка входа');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast.success('Выход выполнен');
  };

  const handleSaveSettings = async () => {
    if (!settings?.id) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from('global_settings')
        .update({
          nbk_rate: parseFloat(nbkRate),
          margin_buy: parseFloat(marginBuy),
          margin_sell: parseFloat(marginSell),
        })
        .eq('id', settings.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['global-settings'] });
      toast.success('Настройки сохранены');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-background" />
            </div>
            <CardTitle className="font-serif">Панель управления</CardTitle>
            <CardDescription>Войдите для доступа к настройкам</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@stiloexchange.kz"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold-light text-background"
                disabled={loginLoading}
              >
                {loginLoading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Вернуться на сайт
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
                <span className="text-background font-serif font-bold text-sm">S</span>
              </div>
              <span className="font-serif text-lg font-semibold">Stilo Exchange</span>
            </Link>
            <span className="text-sm text-muted-foreground">/ Панель управления</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" />
              Продукты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки цен</CardTitle>
                <CardDescription>
                  Управление курсом НБ РК и маржами покупки/продажи
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nbkRate">Курс НБ РК (₸/г)</Label>
                    <Input
                      id="nbkRate"
                      type="number"
                      step="0.01"
                      value={nbkRate}
                      onChange={(e) => setNbkRate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marginBuy">Маржа покупки (%)</Label>
                    <Input
                      id="marginBuy"
                      type="number"
                      step="0.1"
                      value={marginBuy}
                      onChange={(e) => setMarginBuy(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Цена покупки = НБК × (1 - маржа%)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marginSell">Маржа продажи (%)</Label>
                    <Input
                      id="marginSell"
                      type="number"
                      step="0.1"
                      value={marginSell}
                      onChange={(e) => setMarginSell(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Цена продажи = НБК × (1 + маржа%)
                    </p>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <p className="text-sm font-medium">Предпросмотр цен:</p>
                  <div className="flex gap-6 text-sm">
                    <span className="text-teal">
                      Покупка: {Math.round(parseFloat(nbkRate || '0') * (1 - parseFloat(marginBuy || '0') / 100)).toLocaleString('ru-RU')} ₸/г
                    </span>
                    <span className="text-gold">
                      Продажа: {Math.round(parseFloat(nbkRate || '0') * (1 + parseFloat(marginSell || '0') / 100)).toLocaleString('ru-RU')} ₸/г
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={handleSaveSettings}
                  disabled={saving || settingsLoading}
                  className="bg-gold hover:bg-gold-light text-background"
                >
                  {saving ? 'Сохранение...' : 'Сохранить настройки'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Каталог продуктов</CardTitle>
                <CardDescription>
                  Просмотр и управление слитками
                </CardDescription>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Загрузка...</div>
                ) : (
                  <div className="space-y-4">
                    {products?.map((product) => (
                      <div 
                        key={product.id} 
                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
                            <span className="text-background font-bold text-xs">{product.weight}g</span>
                          </div>
                          <div>
                            <p className="font-medium">{product.weight} грамм</p>
                            <p className="text-sm text-muted-foreground">
                              {product.length} × {product.width} мм • Проба {product.purity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gold">
                            {(Math.round(parseFloat(nbkRate || '0') * (1 + parseFloat(marginSell || '0') / 100)) * product.weight).toLocaleString('ru-RU')} ₸
                          </p>
                          <p className="text-xs text-muted-foreground">Цена продажи</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
