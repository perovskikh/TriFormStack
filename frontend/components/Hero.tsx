'use client'

import { ArrowRight, Calculator } from 'lucide-react'

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="pt-16 min-h-screen flex items-center gradient-bg">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - текст */}
          <div className="text-white animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Качественные
              <br />
              <span className="text-yellow-300">строительные</span>
              <br />
              материалы
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Профнастил, металлочерепица, сайдинг и другие материалы 
              по лучшим ценам с быстрой доставкой
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => scrollToSection('catalog')}
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100 flex items-center justify-center space-x-2"
              >
                <span>Смотреть каталог</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Рассчитать стоимость</span>
              </button>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">500+</div>
                <div className="text-blue-100">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">5</div>
                <div className="text-blue-100">Лет на рынке</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">24/7</div>
                <div className="text-blue-100">Поддержка</div>
              </div>
            </div>
          </div>

          {/* Правая колонка - изображение */}
          <div className="relative animate-fade-in-up">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Строительные материалы"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Декоративные элементы */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}