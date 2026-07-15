import HeroSection from './components/HeroSection'
import CategoriesSection from './components/CategoriesSection'
import FeaturesSection from './components/FeaturesSection'
import FeaturedProviders from './components/FeaturedProviders'
import HowItWorks from './components/HowItWorks'
import PopularServices from './components/PopularServices'
import Testimonials from './components/Testimonials'
import StatsSection from './components/StatsSection'
import DownloadApp from './components/DownloadApp'
import Newsletter from './components/Newsletter'
import FAQPreview from './components/FAQPreview'
import CTASection from './components/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturesSection />
      <FeaturedProviders />
      <HowItWorks />
      <PopularServices />
      <Testimonials />
      <StatsSection />
      <DownloadApp />
      <Newsletter />
      <FAQPreview />
      <CTASection />
    </>
  )
}