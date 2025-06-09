'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Calculator, ShoppingCart } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Product } from '@/types'
import { createOrder } from '@/lib/api'
import toast from 'react-hot-toast'

interface OrderModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

interface OrderFormData {
  customer_name: string
  customer_email: string
  customer_phone: string
  quantity_sqm: number
  message: string
}

export default function OrderModal({ product, isOpen, onClose }: OrderModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<OrderFormData>({
    defaultValues: {
      quantity_sqm: 1
    }
  })

  const quantity = watch('quantity_sqm') || 1
  const totalPrice = product ? product.price_per_sqm * quantity : 0

  const onSubmit = async (data: OrderFormData) => {
    if (!product) return

    setIsSubmitting(true)
    try {
      await createOrder({
        ...data,
        product_id: product.id,
        source: 'website'
      })
      
      toast.success('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.')
      reset()
      onClose()
    } catch (error) {
      toast.error('Ошибка при отправке заказа. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="relative p-8">
                  {/* Кнопка закрытия */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    Оформление заказа
                  </Dialog.Title>

                  {/* Информация о товаре */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <p className="text-primary-600 font-medium">
                          {product.price_per_sqm.toLocaleString()} ₽/м²
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Количество и расчет */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Количество (м²) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          {...register('quantity_sqm', { 
                            required: 'Укажите количество',
                            min: { value: 0.1, message: 'Минимум 0.1 м²' }
                          })}
                          className="input-field"
                        />
                        {errors.quantity_sqm && (
                          <p className="text-red-500 text-sm mt-1">{errors.quantity_sqm.message}</p>
                        )}
                      </div>

                      <div className="flex items-end">
                        <div className="bg-primary-50 rounded-lg p-4 w-full">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Итого:</span>
                            <span className="text-xl font-bold text-primary-600">
                              {totalPrice.toLocaleString()} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Контактная информация */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ваше имя *
                        </label>
                        <input
                          type="text"
                          {...register('customer_name', { required: 'Укажите ваше имя' })}
                          className="input-field"
                          placeholder="Иван Иванов"
                        />
                        {errors.customer_name && (
                          <p className="text-red-500 text-sm mt-1">{errors.customer_name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          {...register('customer_phone', { required: 'Укажите номер телефона' })}
                          className="input-field"
                          placeholder="+7 (XXX) XXX-XX-XX"
                        />
                        {errors.customer_phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.customer_phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register('customer_email', { 
                          required: 'Укажите email',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Некорректный email'
                          }
                        })}
                        className="input-field"
                        placeholder="example@email.com"
                      />
                      {errors.customer_email && (
                        <p className="text-red-500 text-sm mt-1">{errors.customer_email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Комментарий к заказу
                      </label>
                      <textarea
                        {...register('message')}
                        rows={3}
                        className="input-field"
                        placeholder="Дополнительная информация, пожелания по доставке..."
                      />
                    </div>

                    {/* Кнопки */}
                    <div className="flex space-x-4 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Отправка...</span>
                          </>
                        ) : (
                          <>
                            <Calculator className="w-4 h-4" />
                            <span>Отправить заказ</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={onClose}
                        className="btn-secondary"
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}