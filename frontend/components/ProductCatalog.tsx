'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Eye, Calculator } from 'lucide-react'
import ProductModal from './ProductModal'
import OrderModal from './OrderModal'
import { Product } from '@/types'
import { getProducts } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [orderProduct, setOrderProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      toast.error('Ошибка загрузки каталога')
    } finally {
      setLoading(false)
    }
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const openOrderModal = (product: Product) => {
    setOrderProduct(product)
    setIsOrderModalOpen(true)
  }

  if (loading) {
    return (
      <section id="catalog\" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка каталога...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="catalog" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Каталог продукции
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Широкий ассортимент качественных строительных материалов 
            для любых задач
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card group">
              {/* Изображение */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openProductModal(product)}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Подробнее</span>
                  </button>
                </div>
              </div>

              {/* Контент */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-primary-600 font-medium">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">
                      {product.price_per_sqm.toLocaleString()} ₽
                    </span>
                    <span className="text-gray-500 ml-1">/м²</span>
                  </div>
                  
                  {product.is_available ? (
                    <span className="text-green-600 text-sm font-medium">
                      В наличии
                    </span>
                  ) : (
                    <span className="text-red-600 text-sm font-medium">
                      Под заказ
                    </span>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => openOrderModal(product)}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Заказать</span>
                  </button>
                  
                  <button
                    onClick={() => openProductModal(product)}
                    className="btn-secondary flex items-center justify-center"
                  >
                    <Calculator className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Каталог пока пуст</p>
          </div>
        )}
      </div>

      {/* Модальные окна */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onOrder={(product) => {
          setIsProductModalOpen(false)
          openOrderModal(product)
        }}
      />

      <OrderModal
        product={orderProduct}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </section>
  )
}