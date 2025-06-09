'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, ShoppingCart, Package, Ruler, Award } from 'lucide-react'
import { Product } from '@/types'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onOrder: (product: Product) => void
}

export default function ProductModal({ product, isOpen, onClose, onOrder }: ProductModalProps) {
  if (!product) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="relative">
                  {/* Кнопка закрытия */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Изображение */}
                    <div className="relative h-96 md:h-full">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Информация */}
                    <div className="p-8">
                      <div className="mb-4">
                        <span className="text-sm text-primary-600 font-medium">
                          {product.category}
                        </span>
                      </div>

                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold text-gray-900 mb-4"
                      >
                        {product.name}
                      </Dialog.Title>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Цена */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Цена за м²:</span>
                          <span className="text-2xl font-bold text-primary-600">
                            {product.price_per_sqm.toLocaleString()} ₽
                          </span>
                        </div>
                      </div>

                      {/* Характеристики */}
                      {product.specifications && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Award className="w-5 h-5 mr-2" />
                            Характеристики
                          </h4>
                          <p className="text-gray-600">{product.specifications}</p>
                        </div>
                      )}

                      {/* Статус наличия */}
                      <div className="flex items-center mb-6">
                        <Package className="w-5 h-5 mr-2" />
                        {product.is_available ? (
                          <span className="text-green-600 font-medium">В наличии</span>
                        ) : (
                          <span className="text-orange-600 font-medium">Под заказ</span>
                        )}
                      </div>

                      {/* Кнопки действий */}
                      <div className="flex space-x-4">
                        <button
                          onClick={() => onOrder(product)}
                          className="flex-1 btn-primary flex items-center justify-center space-x-2"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>Заказать</span>
                        </button>
                        
                        <button
                          onClick={onClose}
                          className="btn-secondary"
                        >
                          Закрыть
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}