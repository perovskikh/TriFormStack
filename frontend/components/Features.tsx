import { Shield, Truck, Clock, Award, Calculator, Headphones } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Все материалы сертифицированы и соответствуют ГОСТ стандартам'
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'Доставляем по всей России в кратчайшие сроки'
  },
  {
    icon: Clock,
    title: 'Работаем 24/7',
    description: 'Принимаем заказы круглосуточно через сайт и Telegram-бот'
  },
  {
    icon: Award,
    title: 'Лучшие цены',
    description: 'Работаем напрямую с производителями, без посредников'
  },
  {
    icon: Calculator,
    title: 'Точный расчет',
    description: 'Калькулятор стоимости поможет рассчитать нужное количество'
  },
  {
    icon: Headphones,
    title: 'Поддержка 24/7',
    description: 'Наши специалисты всегда готовы помочь с выбором'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы предлагаем не просто материалы, а комплексные решения 
            для вашего строительства с полным сервисом
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card p-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}