import { useLanguage } from '@/contexts/LanguageContext'
import { ExternalLink, MapPin, Navigation, Phone } from 'lucide-react'

// Встроенный компонент иконки WhatsApp, так как его нет в lucide-react
const WhatsAppIcon = ({ className }: { className?: string }) => (
	<svg
		viewBox='0 0 24 24'
		fill='currentColor'
		className={className}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
	</svg>
)

const LocationSection = () => {
	const { t } = useLanguage()

	const address = '050050, г. Алматы, пр. Турара Рыскулова, 57В/4'
	const firmId = '70000001082668087'
	const dgisUrl = `https://2gis.kz/almaty/firm/${firmId}`
	const googleMapsUrl =
		'https://www.google.com/maps/search/?api=1&query=43.287289,76.923169'

	return (
		<section id='contact' className='py-16 md:py-24 px-4 md:px-6'>
			<div className='container mx-auto max-w-5xl'>
				<div className='text-center mb-10 md:mb-16'>
					<h2 className='font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-3 md:mb-4'>
						{t.contactTitle} <span className='text-gold-gradient'>с нами</span>
					</h2>
					<p className='text-sm md:text-lg text-muted-foreground'>
						{t.contactSubtitle}
					</p>
				</div>

				<div className='glass-card p-6 md:p-12 max-w-4xl mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
						{/* Статичная карта-заглушка */}
						<a
							href={dgisUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-2xl group block'
						>
							<img
								src='/images/map-placeholder.jpg'
								alt='Расположение на карте'
								className='w-full h-full object-cover grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700'
							/>
							<div className='absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center'>
								<div className='bg-background/90 px-4 py-2 rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity shadow-xl'>
									<p className='text-xs font-bold text-foreground uppercase tracking-wider'>
										Открыть карту
									</p>
								</div>
							</div>
						</a>

						{/* Контактная информация */}
						<div className='space-y-6'>
							<div className='flex items-start gap-4'>
								<div className='w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0'>
									<MapPin className='w-5 h-5 text-gold' />
								</div>
								<div>
									<p className='font-semibold text-foreground mb-1'>
										{t.officeAddress}
									</p>
									<p className='text-muted-foreground text-sm leading-relaxed'>
										{address}
									</p>
								</div>
							</div>

							<div className='flex items-start gap-4'>
								<div className='w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0'>
									<Phone className='w-5 h-5 text-gold' />
								</div>
								<div>
									<p className='font-semibold text-foreground mb-1'>
										{t.phone}
									</p>
									<a
										href='tel:+77273122140'
										className='block text-gold hover:text-gold-light transition-colors font-medium'
									>
										+7 (727) 312-21-40
									</a>
								</div>
							</div>

							{/* Кнопка 2ГИС */}
							<a
								href={dgisUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='w-full bg-[#00AA00] hover:bg-[#008800] text-white flex items-center justify-center gap-3 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1'
							>
								<Navigation className='w-5 h-5' />
								<span className='font-bold tracking-wide uppercase'>
									Открыть в 2ГИС
								</span>
							</a>

							{/* Кнопки WhatsApp и Google */}
							<div className='grid grid-cols-2 gap-4'>
								<a
									href='https://wa.me/77027061188'
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/80 hover:text-white'
								>
									<WhatsAppIcon className='w-5 h-5 text-[#25D366]' />
									<span className='text-sm font-medium'>WhatsApp</span>
								</a>
								<a
									href={googleMapsUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='btn-outline-light flex items-center justify-center gap-2 py-3 border border-border rounded-xl hover:bg-muted/50 transition-all'
								>
									<ExternalLink className='w-4 h-4' />
									<span className='text-sm font-medium'>Google Maps</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LocationSection
