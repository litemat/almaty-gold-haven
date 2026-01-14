import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProducts } from '@/hooks/useProducts'
import {
	calculateBuyPrice,
	calculateMarginFromBuyPrice,
	calculateMarginFromSellPrice,
	calculateSellPrice,
	useSettings,
} from '@/hooks/useSettings'
import { supabase } from '@/integrations/supabase/client'
import { useQueryClient } from '@tanstack/react-query'
import {
	ArrowLeft,
	LogOut,
	Package,
	Settings,
	Shield,
	Upload,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Admin = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { data: settings, isLoading: settingsLoading } = useSettings()
	const { data: products, isLoading: productsLoading } = useProducts()

	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginLoading, setLoginLoading] = useState(false)

	// Settings form state
	const [nbkRate, setNbkRate] = useState('')
	const [marginBuy, setMarginBuy] = useState('')
	const [marginSell, setMarginSell] = useState('')
	const [buyPrice, setBuyPrice] = useState('')
	const [sellPrice, setSellPrice] = useState('')
	const [saving, setSaving] = useState(false)

	// Image upload state
	const [uploadingProductId, setUploadingProductId] = useState<string | null>(
		null
	)
	const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

	useEffect(() => {
		checkAuth()

		// Set up auth state listener
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT') {
				setIsAuthenticated(false)
			} else if (session) {
				const { data: roles } = await supabase
					.from('user_roles')
					.select('role')
					.eq('user_id', session.user.id)
					.eq('role', 'admin')
				setIsAuthenticated(roles && roles.length > 0)
			}
		})

		return () => subscription.unsubscribe()
	}, [])

	useEffect(() => {
		if (settings) {
			setNbkRate(settings.nbk_rate.toString())
			setMarginBuy(settings.margin_buy.toString())
			setMarginSell(settings.margin_sell.toString())
			setBuyPrice(settings.buy_price?.toString() || '')
			setSellPrice(settings.sell_price?.toString() || '')
		}
	}, [settings])

	const checkAuth = async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession()
		if (session) {
			// Check if user has admin role
			const { data: roles } = await supabase
				.from('user_roles')
				.select('role')
				.eq('user_id', session.user.id)
				.eq('role', 'admin')

			setIsAuthenticated(roles && roles.length > 0)
		}
		setIsLoading(false)
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoginLoading(true)

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			if (error) throw error

			// Check if user has admin role
			const { data: roles, error: rolesError } = await supabase
				.from('user_roles')
				.select('role')
				.eq('user_id', data.user.id)
				.eq('role', 'admin')

			if (rolesError) throw rolesError

			if (!roles || roles.length === 0) {
				await supabase.auth.signOut()
				toast.error('У вас нет прав администратора')
				return
			}

			setIsAuthenticated(true)
			toast.success('Успешный вход')
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : 'Ошибка входа'
			toast.error(message)
		} finally {
			setLoginLoading(false)
		}
	}

	const handleLogout = async () => {
		await supabase.auth.signOut()
		setIsAuthenticated(false)
		toast.success('Выход выполнен')
	}

	const handleSaveSettings = async () => {
		if (!settings?.id) {
			toast.error('Настройки не загружены')
			return
		}
		setSaving(true)

		try {
			const updateData: {
				nbk_rate: number
				margin_buy: number
				margin_sell: number
				buy_price?: number | null
				sell_price?: number | null
			} = {
				nbk_rate: parseFloat(nbkRate) || 0,
				margin_buy: parseFloat(marginBuy) || 0,
				margin_sell: parseFloat(marginSell) || 0,
			}

			// Include final prices if they are set
			if (buyPrice && !isNaN(parseFloat(buyPrice))) {
				updateData.buy_price = parseFloat(buyPrice)
			} else {
				updateData.buy_price = null
			}

			if (sellPrice && !isNaN(parseFloat(sellPrice))) {
				updateData.sell_price = parseFloat(sellPrice)
			} else {
				updateData.sell_price = null
			}

			console.log('Saving settings:', updateData)

			const { data, error } = await supabase
				.from('global_settings')
				.update(updateData)
				.eq('id', settings.id)
				.select()
				.single()

			if (error) {
				console.error('Save error:', error)
				// If error is about missing columns, suggest applying migration
				if (
					error.message?.includes('column') ||
					error.message?.includes('does not exist') ||
					error.code === '42703'
				) {
					throw new Error(
						'Поля buy_price или sell_price не существуют в базе. Примените миграцию 20260112230319_add_final_prices.sql в Supabase Dashboard'
					)
				}
				throw error
			}

			if (!data) {
				throw new Error(
					'Не удалось сохранить настройки: ответ от сервера пустой'
				)
			}

			console.log('Settings saved successfully:', data)

			queryClient.invalidateQueries({ queryKey: ['global-settings'] })
			toast.success('Настройки сохранены')
		} catch (error: unknown) {
			console.error('Save settings error:', error)
			const message =
				error instanceof Error ? error.message : 'Ошибка сохранения'
			toast.error(message)
		} finally {
			setSaving(false)
		}
	}

	// Handle NBK rate change - recalculate final prices if margins are set
	const handleNbkRateChange = (value: string) => {
		setNbkRate(value)
		const nbk = parseFloat(value) || 0
		if (nbk > 0 && marginBuy && !isNaN(parseFloat(marginBuy))) {
			const calculatedBuyPrice = calculateBuyPrice(nbk, parseFloat(marginBuy))
			setBuyPrice(calculatedBuyPrice.toString())
		}
		if (nbk > 0 && marginSell && !isNaN(parseFloat(marginSell))) {
			const calculatedSellPrice = calculateSellPrice(
				nbk,
				parseFloat(marginSell)
			)
			setSellPrice(calculatedSellPrice.toString())
		}
	}

	// Handle margin buy change - recalculate buy price
	const handleMarginBuyChange = (value: string) => {
		setMarginBuy(value)
		const nbk = parseFloat(nbkRate) || 0
		const margin = parseFloat(value) || 0
		if (nbk > 0 && margin >= 0) {
			const calculatedBuyPrice = calculateBuyPrice(nbk, margin)
			setBuyPrice(calculatedBuyPrice.toString())
		}
	}

	// Handle margin sell change - recalculate sell price
	const handleMarginSellChange = (value: string) => {
		setMarginSell(value)
		const nbk = parseFloat(nbkRate) || 0
		const margin = parseFloat(value) || 0
		if (nbk > 0 && margin >= 0) {
			const calculatedSellPrice = calculateSellPrice(nbk, margin)
			setSellPrice(calculatedSellPrice.toString())
		}
	}

	// Handle buy price change - recalculate margin buy
	const handleBuyPriceChange = (value: string) => {
		setBuyPrice(value)
		const nbk = parseFloat(nbkRate) || 0
		const price = parseFloat(value) || 0
		if (nbk > 0 && price > 0) {
			const calculatedMargin = calculateMarginFromBuyPrice(nbk, price)
			setMarginBuy(calculatedMargin.toString())
		}
	}

	// Handle sell price change - recalculate margin sell
	const handleSellPriceChange = (value: string) => {
		setSellPrice(value)
		const nbk = parseFloat(nbkRate) || 0
		const price = parseFloat(value) || 0
		if (nbk > 0 && price > 0) {
			const calculatedMargin = calculateMarginFromSellPrice(nbk, price)
			setMarginSell(calculatedMargin.toString())
		}
	}

	const handleImageUpload = async (productId: string, file: File) => {
		setUploadingProductId(productId)

		try {
			// Create a unique file name
			const fileExt = file.name.split('.').pop()
			const fileName = `${productId}-${Date.now()}.${fileExt}`
			const filePath = `${fileName}`

			console.log('Uploading image:', filePath)

			// Upload to Supabase Storage
			const { data: uploadData, error: uploadError } = await supabase.storage
				.from('product-images')
				.upload(filePath, file, { upsert: true })

			if (uploadError) {
				console.error('Upload error:', uploadError)
				throw uploadError
			}

			if (!uploadData) {
				throw new Error(
					'Не удалось загрузить изображение: ответ от сервера пустой'
				)
			}

			console.log('Image uploaded:', uploadData)

			// Get public URL
			const { data: urlData } = supabase.storage
				.from('product-images')
				.getPublicUrl(filePath)

			if (!urlData?.publicUrl) {
				throw new Error('Не удалось получить публичный URL изображения')
			}

			console.log('Public URL:', urlData.publicUrl)

			// Update product with new image URL
			const { data: updateData, error: updateError } = await supabase
				.from('products')
				.update({ image_url: urlData.publicUrl })
				.eq('id', productId)
				.select()
				.single()

			if (updateError) {
				console.error('Update error:', updateError)
				throw updateError
			}

			if (!updateData) {
				throw new Error('Не удалось обновить продукт: ответ от сервера пустой')
			}

			console.log('Product updated:', updateData)

			queryClient.invalidateQueries({ queryKey: ['products'] })
			toast.success('Изображение загружено')
		} catch (error: unknown) {
			console.error('Image upload error:', error)
			const message = error instanceof Error ? error.message : 'Ошибка загрузки'
			toast.error(message)
		} finally {
			setUploadingProductId(null)
		}
	}

	const triggerFileInput = (productId: string) => {
		fileInputRefs.current[productId]?.click()
	}

	if (isLoading) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gold'></div>
			</div>
		)
	}

	if (!isAuthenticated) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center p-4'>
				<Card className='w-full max-w-md'>
					<CardHeader className='text-center'>
						<div className='w-12 h-12 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center mx-auto mb-4'>
							<Shield className='w-6 h-6 text-background' />
						</div>
						<CardTitle className='font-serif'>Панель управления</CardTitle>
						<CardDescription>Войдите для доступа к настройкам</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleLogin} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={e => setEmail(e.target.value)}
									placeholder='admin@stiloexchange.kz'
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='password'>Пароль</Label>
								<Input
									id='password'
									type='password'
									value={password}
									onChange={e => setPassword(e.target.value)}
									required
								/>
							</div>
							<Button
								type='submit'
								className='w-full bg-gold hover:bg-gold-light text-background'
								disabled={loginLoading}
							>
								{loginLoading ? 'Вход...' : 'Войти'}
							</Button>
						</form>
						<div className='mt-4 text-center'>
							<Link
								to='/'
								className='text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2'
							>
								<ArrowLeft className='w-4 h-4' />
								Вернуться на сайт
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<header className='border-b border-border bg-card'>
				<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<Link to='/' className='flex items-center gap-2'>
							<div className='w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center'>
								<span className='text-background font-serif font-bold text-sm'>
									S
								</span>
							</div>
							<span className='font-serif text-lg font-semibold'>
								Stilo Exchange
							</span>
						</Link>
						<span className='text-sm text-muted-foreground'>
							/ Панель управления
						</span>
					</div>
					<Button variant='outline' size='sm' onClick={handleLogout}>
						<LogOut className='w-4 h-4 mr-2' />
						Выйти
					</Button>
				</div>
			</header>

			{/* Content */}
			<main className='container mx-auto px-4 py-8'>
				<Tabs defaultValue='settings' className='space-y-6'>
					<TabsList>
						<TabsTrigger value='settings' className='gap-2'>
							<Settings className='w-4 h-4' />
							Настройки
						</TabsTrigger>
						<TabsTrigger value='products' className='gap-2'>
							<Package className='w-4 h-4' />
							Продукты
						</TabsTrigger>
					</TabsList>

					<TabsContent value='settings'>
						<Card>
							<CardHeader>
								<CardTitle>Настройки цен</CardTitle>
								<CardDescription>
									Управление курсом НБ РК и маржами покупки/продажи
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
									<div className='space-y-2'>
										<Label htmlFor='nbkRate'>Курс НБ РК (₸/г)</Label>
										<Input
											id='nbkRate'
											type='number'
											step='0.01'
											value={nbkRate}
											onChange={e => handleNbkRateChange(e.target.value)}
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='marginBuy'>Маржа покупки (%)</Label>
										<Input
											id='marginBuy'
											type='number'
											step='0.1'
											value={marginBuy}
											onChange={e => handleMarginBuyChange(e.target.value)}
										/>
										<p className='text-xs text-muted-foreground'>
											Цена покупки = НБК × (1 - маржа%)
										</p>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='marginSell'>Маржа продажи (%)</Label>
										<Input
											id='marginSell'
											type='number'
											step='0.1'
											value={marginSell}
											onChange={e => handleMarginSellChange(e.target.value)}
										/>
										<p className='text-xs text-muted-foreground'>
											Цена продажи = НБК × (1 + маржа%)
										</p>
									</div>
								</div>

								{/* Final prices input */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-2'>
										<Label htmlFor='buyPrice'>Покупка (₸/г)</Label>
										<Input
											id='buyPrice'
											type='number'
											step='0.01'
											value={buyPrice}
											onChange={e => handleBuyPriceChange(e.target.value)}
											placeholder='72 110'
										/>
										<p className='text-xs text-muted-foreground'>
											При вводе маржа пересчитывается автоматически
										</p>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='sellPrice'>Продажа (₸/г)</Label>
										<Input
											id='sellPrice'
											type='number'
											step='0.01'
											value={sellPrice}
											onChange={e => handleSellPriceChange(e.target.value)}
											placeholder='77 498'
										/>
										<p className='text-xs text-muted-foreground'>
											При вводе маржа пересчитывается автоматически
										</p>
									</div>
								</div>

								{/* Preview */}
								<div className='p-4 rounded-lg bg-muted/50 space-y-2'>
									<p className='text-sm font-medium'>Предпросмотр цен:</p>
									<div className='flex gap-6 text-sm'>
										<span className='text-teal'>
											Покупка:{' '}
											{buyPrice && !isNaN(parseFloat(buyPrice))
												? parseFloat(buyPrice).toLocaleString('ru-RU')
												: Math.round(
														parseFloat(nbkRate || '0') *
															(1 - parseFloat(marginBuy || '0') / 100)
												  ).toLocaleString('ru-RU')}{' '}
											₸/г
										</span>
										<span className='text-gold'>
											Продажа:{' '}
											{sellPrice && !isNaN(parseFloat(sellPrice))
												? parseFloat(sellPrice).toLocaleString('ru-RU')
												: Math.round(
														parseFloat(nbkRate || '0') *
															(1 + parseFloat(marginSell || '0') / 100)
												  ).toLocaleString('ru-RU')}{' '}
											₸/г
										</span>
									</div>
								</div>

								<Button
									onClick={handleSaveSettings}
									disabled={saving || settingsLoading}
									className='bg-gold hover:bg-gold-light text-background'
								>
									{saving ? 'Сохранение...' : 'Сохранить настройки'}
								</Button>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value='products'>
						<Card>
							<CardHeader>
								<CardTitle>Каталог продуктов</CardTitle>
								<CardDescription>
									Управление слитками и загрузка изображений
								</CardDescription>
							</CardHeader>
							<CardContent>
								{productsLoading ? (
									<div className='text-center py-8 text-muted-foreground'>
										Загрузка...
									</div>
								) : (
									<div className='space-y-4'>
										{products?.map(product => (
											<div
												key={product.id}
												className='flex items-center justify-between p-4 rounded-lg border border-border'
											>
												<div className='flex items-center gap-4'>
													{/* Product Image/Icon */}
													<div className='relative'>
														{product.image_url ? (
															<div className='w-16 h-16 rounded-lg overflow-hidden border border-border'>
																<img
																	src={product.image_url}
																	alt={`${product.weight}g`}
																	className='w-full h-full object-cover'
																/>
															</div>
														) : (
															<div className='w-16 h-16 rounded-lg bg-gradient-to-br from-gold-light to-gold flex items-center justify-center'>
																<span className='text-background font-bold text-sm'>
																	{product.weight}g
																</span>
															</div>
														)}

														{/* Upload Button Overlay */}
														<button
															onClick={() => triggerFileInput(product.id)}
															disabled={uploadingProductId === product.id}
															className='absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-gold hover:bg-gold-light flex items-center justify-center transition-colors disabled:opacity-50'
														>
															{uploadingProductId === product.id ? (
																<div className='w-3 h-3 border border-background border-t-transparent rounded-full animate-spin' />
															) : (
																<Upload className='w-3.5 h-3.5 text-background' />
															)}
														</button>

														{/* Hidden File Input */}
														<input
															ref={el =>
																(fileInputRefs.current[product.id] = el)
															}
															type='file'
															accept='image/*'
															className='hidden'
															onChange={e => {
																const file = e.target.files?.[0]
																if (file) handleImageUpload(product.id, file)
															}}
														/>
													</div>

													<div>
														<p className='font-medium'>
															{product.weight} грамм
														</p>
														<p className='text-sm text-muted-foreground'>
															{product.width} × {product.length} мм • Проба{' '}
															{product.purity}
														</p>
													</div>
												</div>
												<div className='text-right'>
													<p className='font-bold text-gold'>
														{(() => {
															const sellPricePerGram =
																sellPrice && !isNaN(parseFloat(sellPrice))
																	? parseFloat(sellPrice)
																	: Math.round(
																			parseFloat(nbkRate || '0') *
																				(1 +
																					parseFloat(marginSell || '0') / 100)
																	  )
															return (
																sellPricePerGram * product.weight
															).toLocaleString('ru-RU')
														})()}{' '}
														₸
													</p>
													<p className='text-xs text-muted-foreground'>
														Цена продажи
													</p>
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
	)
}

export default Admin
