import { useLanguage } from '@/contexts/LanguageContext'
import { useProducts } from '@/hooks/useProducts'
import { getSellPrice, useSettings } from '@/hooks/useSettings'

const CatalogSection = () => {
	const { t } = useLanguage()
	const { data: products, isLoading: productsLoading } = useProducts()
	const { data: settings, isLoading: settingsLoading } = useSettings()

	const isLoading = productsLoading || settingsLoading
	const pricePerGram = getSellPrice(settings)

	const getWhatsAppLink = (weight: number, price: number) => {
		const message = encodeURIComponent(
			`Здравствуйте! Интересует слиток ${weight}г за ${price.toLocaleString(
				'ru-RU'
			)} ₸. Подскажите по наличию.`
		)
		return `https://wa.me/77027061188?text=${message}`
	}

	return (
		<section id='catalog' className='py-12 md:py-24 px-3 md:px-6'>
			<div className='container mx-auto max-w-6xl'>
				{/* Section Header */}
				<div className='text-center mb-8 md:mb-16'>
					<h2 className='font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 md:mb-4'>
						{t.catalogTitle} <span className='text-gold-gradient'>слитков</span>
					</h2>
					<p className='text-sm md:text-lg text-muted-foreground max-w-xl mx-auto'>
						{t.catalogSubtitle}
					</p>
				</div>

				{isLoading ? (
					<div className='flex flex-wrap justify-center gap-2 md:gap-6'>
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className='catalog-card p-3 md:p-6 animate-pulse w-[calc(50%-0.5rem)] md:w-64 rounded-xl'
							>
								{/* Скелетон тоже увеличили */}
								<div className='w-28 h-28 md:w-48 md:h-48 mx-auto mb-3 rounded-xl bg-muted' />
								<div className='h-4 bg-muted rounded mb-2' />
								<div className='h-3 bg-muted rounded w-2/3 mx-auto mb-3' />
								<div className='h-8 bg-muted rounded' />
							</div>
						))}
					</div>
				) : (
					<div className='flex flex-wrap justify-center gap-2 md:gap-6'>
						{products?.map(product => {
							const price = pricePerGram * product.weight
							return (
								<div
									key={product.id}
									className='catalog-card group p-3 md:p-6 w-[calc(50%-0.5rem)] md:w-64 flex flex-col justify-between rounded-xl'
								>
									{/* Верхняя часть карточки */}
									<div>
										{/* Изображение или иконка */}
										{product.image_url ? (
											// ИЗМЕНЕНИЕ ЗДЕСЬ:
											// Было: w-12 h-12 md:w-20 md:h-20
											// Стало: w-28 h-28 (112px) на мобильных, md:w-48 md:h-48 (192px) на ПК
											<div className='w-28 h-28 md:w-48 md:h-48 mx-auto mb-3 md:mb-6 rounded-xl overflow-hidden shadow-sm bg-white/5'>
												<img
													src={product.image_url}
													alt={`${product.weight}g gold bar`}
													// object-contain лучше, чтобы весь слиток влез и не обрезался
													// если нужно заполнить весь квадрат - верни object-cover
													className='w-full h-full object-contain p-1'
												/>
											</div>
										) : (
											// Иконка-заглушка тоже увеличена
											<div className='gold-bar-icon w-28 h-28 md:w-48 md:h-48 mx-auto mb-3 md:mb-6 rounded-xl shadow-lg shadow-gold/10 flex items-center justify-center'>
												<span className='text-background font-bold text-lg md:text-2xl'>
													{product.weight}g
												</span>
											</div>
										)}

										{/* Вес */}
										<h3 className='font-serif text-sm md:text-xl font-semibold text-foreground mb-1 md:mb-2'>
											{product.weight} {t.grams}
										</h3>

										{/* Характеристики */}
										<div className='space-y-0.5 md:space-y-1 mb-2 md:mb-4'>
											<p className='text-[10px] md:text-xs text-muted-foreground'>
												{t.purity}:{' '}
												<span className='text-gold/90'>{product.purity}</span>
											</p>
											<p className='text-[10px] md:text-xs text-muted-foreground'>
												{t.dimensions}:{' '}
												<span className='text-foreground/80'>
													{product.width}×{product.length}
												</span>
											</p>
										</div>

										{/* Цена */}
										<p className='text-sm md:text-2xl font-bold text-gold mb-3 md:mb-6'>
											{price.toLocaleString('ru-RU')}
											<span className='text-[10px] md:text-sm text-gold/70 ml-1'>
												₸
											</span>
										</p>
									</div>

									{/* Кнопка WhatsApp */}
									{/* Кнопка WhatsApp */}
									<a
										href={getWhatsAppLink(product.weight, price)}
										target='_blank'
										rel='noopener noreferrer'
										className='w-full btn-gold-soft text-[11px] md:text-sm py-2.5 md:py-3 flex items-center justify-center gap-2 group-hover:bg-gold/20 rounded-lg transition-all duration-300'
									>
										<svg
											className='w-4 h-4 md:w-5 md:h-5 shrink-0' // shrink-0 не дает иконке уменьшаться
											viewBox='0 0 24 24'
											fill='currentColor'
										>
											<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
										</svg>
										<span className='whitespace-nowrap font-medium tracking-wide'>
											{t.reserve}
										</span>
									</a>
								</div>
							)
						})}
					</div>
				)}

				{/* Trust Note */}
				<p className='text-center text-[10px] md:text-sm text-muted-foreground mt-6 md:mt-12 pb-safe'>
					{t.certifiedDesc}
				</p>
			</div>
		</section>
	)
}

export default CatalogSection
