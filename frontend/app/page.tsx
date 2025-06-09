import Hero from '@/components/Hero'
import ProductCatalog from '@/components/ProductCatalog'
import Features from '@/components/Features'
import Contact from '@/components/Contact'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <ProductCatalog />
      <Contact />
      <Footer />
    </main>
  )
}