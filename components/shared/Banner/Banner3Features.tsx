import React from 'react'
import Image from 'next/image'

interface FeatureSectionProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, description, imageSrc, imageAlt }) => (
  <div className='flex flex-col items-center text-center mb-10 md:mb-0'>
    <div className="relative flex justify-center 
    w-full max-w-[380px] md:max-w-[300px] lg:max-w-[360px] xl:max-w-[400px]
    h-[200px] md:h-[160px] lg:h-[240px]">
      {/* Efecto degradado */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gray-200 to-transparent"></div>
      <Image src={imageSrc} alt={imageAlt} fill className="relative z-10 p-2 md:pt-5 lg:pt-10 object-contain" />
    </div>
    <h3 className="mt-4 text-xl sm:text-2xl md:text-xl lg:text-2xl font-semibold md:max-w-[280px]">{title}</h3>
    <p className="mt-2 text-base sm:text-lg md:text-base lg:text-xl text-gray-600 md:max-w-[300px]">{description}</p>
  </div>
)

const MobileFeatures: React.FC = () => {
  const features: FeatureSectionProps[] = [
    {
      title: "Responsive Mobile Solutions",
      description: "Enjoy consistent and engaging experiences across devices with our mobile-friendly solutions.",
      imageSrc: "/f_01.png",
      imageAlt: "Mobile design",
    },
    {
      title: "E-Commerce Excellence",
      description: "Elevate your online store with user-friendly interfaces and secure payment gateways.",
      imageSrc: "/f_02.png",
      imageAlt: "E-commerce icons",
    },
    {
      title: "Dynamic Content Platforms",
      description: "Empower content creators with dynamic platforms fostering engagement and personalization.",
      imageSrc: "/f_03.png",
      imageAlt: "Content platform analytics",
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto max-w-[500px] md:max-w-none">
      <h2 className="mb-6 text-center text-4xl font-extrabold md:text-5xl">Empowerment at Your Fingertips</h2>
      <p className='w-full mb-10 text-center md:w-3/4 lg:w-2/4'>
        Explore the range of industries we've served and the impactful solutions we've crafted for our clients.
      </p>
      <div className='container grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-1'>
        {features.map((feature, index) => (
          <FeatureSection key={index} {...feature} />
        ))}
      </div>
    </div>
  )
}

export default MobileFeatures