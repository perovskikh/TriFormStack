import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold">TriFormStack</span>
            </div>
            <p className="text-gray-400 mb-4">
              Качественные строительные материалы для вашего дома. 
              Работаем с 2019 года.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Кровельные материалы</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Фасадные материалы</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Профнастил</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Металлочерепица</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Сайдинг</a></li>
            </ul>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Консультации</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Расчет материалов</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Монтаж</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Гарантия</a></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+7 (XXX) XXX-XX-XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@triformstack.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>г. Москва, ул. Примерная, д. 1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TriFormStack. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}