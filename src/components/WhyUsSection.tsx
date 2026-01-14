import { useLanguage } from '@/contexts/LanguageContext'
import {
	Award,
	ChevronLeft,
	ChevronRight,
	History,
	Shield,
	TrendingUp,
	Users,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const features = [
	{
		icon: History,
		title: '20+ лет опыта',
		description:
			'Работаем на рынке с 2004 года, заслужив доверие тысяч клиентов',
	},
	{
		icon: Award,
		title: 'Слитки Нацбанка РК',
		description:
			'Оригинальное золото 999.9 в защитной упаковке с сертификатами',
	},
	{
		icon: TrendingUp,
		title: 'Выгодный курс',
		description: 'Прозрачное ценообразование и одни из лучших условий обмена',
	},
	{
		icon: Shield,
		title: '100% Легальность',
		description: 'Полный пакет лицензий и прозрачное оформление каждой сделки',
	},
	{
		icon: Users,
		title: 'Частный подход',
		description:
			'Индивидуальные решения для инвесторов и корпоративных клиентов',
	},
]

const WhyUsSection = () => {
	const { t } = useLanguage()
	const scrollRef = useRef<HTMLDivElement>(null)
	const [showLeftArrow, setShowLeftArrow] = useState(false)
	const [showRightArrow, setShowRightArrow] = useState(true)

	const checkScroll = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
			setShowLeftArrow(scrollLeft > 10)
			setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
		}
	}

	const scroll = (direction: 'left' | 'right') => {
		if (scrollRef.current) {
			// Динамически берем ширину контейнера для плавного шага
			const containerWidth = scrollRef.current.clientWidth
			const scrollAmount =
				containerWidth > 768 ? containerWidth / 2 : containerWidth * 0.8

			scrollRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			})
		}
	}

	useEffect(() => {
		const currentRef = scrollRef.current
		if (currentRef) {
			currentRef.addEventListener('scroll', checkScroll)
			checkScroll()
		}
		return () => currentRef?.removeEventListener('scroll', checkScroll)
	}, [])

	return (
		<section
			id='about'
			className='py-20 md:py-28 px-4 md:px-6 bg-muted/20 overflow-hidden'
		>
			{/* Стили для скрытия скроллбара */}
			<style
				dangerouslySetInnerHTML={{
					__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
				}}
			/>

			<div className='container mx-auto max-w-6xl'>
				{/* О компании (без изменений) */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20'>
					<div>
						<h2 className='font-serif text-3xl md:text-5xl font-semibold text-foreground mb-6'>
							О компании{' '}
							<span className='text-gold-gradient'>Stilo Exchange</span>
						</h2>
						<div className='space-y-4 text-muted-foreground leading-relaxed'>
							<p>
								Мы специализируемся на продаже инвестиционных золотых слитков и
								успешно работаем на рынке с 2004 года.
							</p>
							<p>
								Мы реализуем оригинальные инвестиционные слитки{' '}
								<span className='text-foreground font-medium'>Нацбанка РК</span>
								. Подлинность подтверждается сертификатами и защитной упаковкой.
							</p>
						</div>
					</div>

					<div className='glass-card p-8 border-gold/30 bg-gold/5 relative overflow-hidden'>
						<div className='absolute -right-10 -top-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl'></div>
						<blockquote className='relative z-10'>
							<p className='text-xl font-serif italic text-foreground mb-4'>
								"Инвестиции в золото должны быть простыми, прозрачными и
								надёжными."
							</p>
							<cite className='text-gold font-medium not-italic'>
								— Команда Stilo Exchange
							</cite>
						</blockquote>
					</div>
				</div>

				{/* Заголовок и стрелки */}
				<div className='flex items-end justify-between mb-8'>
					<h3 className='font-serif text-2xl md:text-4xl font-semibold text-foreground'>
						Почему <span className='text-gold-gradient'>выбирают нас</span>
					</h3>

					<div className='hidden md:flex gap-2'>
						<button
							onClick={() => scroll('left')}
							disabled={!showLeftArrow}
							className={`p-2 rounded-full border border-gold/20 transition-all ${
								!showLeftArrow
									? 'opacity-30 cursor-not-allowed'
									: 'hover:bg-gold/10 active:scale-95'
							}`}
						>
							<ChevronLeft className='w-6 h-6 text-gold' />
						</button>
						<button
							onClick={() => scroll('right')}
							disabled={!showRightArrow}
							className={`p-2 rounded-full border border-gold/20 transition-all ${
								!showRightArrow
									? 'opacity-30 cursor-not-allowed'
									: 'hover:bg-gold/10 active:scale-95'
							}`}
						>
							<ChevronRight className='w-6 h-6 text-gold' />
						</button>
					</div>
				</div>

				{/* Карусель */}
				<div className='relative group'>
					<div
						ref={scrollRef}
						className='flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory no-scrollbar -mx-4 px-4 scroll-smooth'
					>
						{features.map((feature, index) => (
							<div
								key={index}
								className='glass-card p-8 text-center min-w-[85%] md:min-w-[320px] lg:flex-1 snap-center hover:border-gold/50 transition-all duration-300'
							>
								<div className='w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6'>
									<feature.icon className='w-7 h-7 text-gold' />
								</div>
								<h4 className='font-serif text-lg font-semibold text-foreground mb-3 uppercase tracking-tight'>
									{feature.title}
								</h4>
								<p className='text-sm text-muted-foreground leading-relaxed'>
									{feature.description}
								</p>
							</div>
						))}
					</div>

					{/* Градиент (только для мобильных) */}
					<div className='md:hidden absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background/20 to-transparent pointer-events-none' />
				</div>

				{/* Точки (Dots) для мобильных */}
				<div className='flex md:hidden justify-center gap-2 mt-6'>
					{features.map((_, i) => (
						<div key={i} className='w-1.5 h-1.5 rounded-full bg-gold/30' />
					))}
				</div>
			</div>
		</section>
	)
}

export default WhyUsSection
