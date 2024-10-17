import React from 'react';
import Image from 'next/image';

interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
}) => (
  <div className="mb-10 flex flex-col items-center text-center md:mb-0">
    <div className="relative flex h-[200px] w-full max-w-[380px] justify-center md:h-[160px] md:max-w-[300px] lg:h-[240px] lg:max-w-[360px] xl:max-w-[400px]">
      {/* Efecto degradado */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gray-200 to-transparent"></div>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="relative z-10 object-contain p-2 md:pt-5 lg:pt-10"
      />
    </div>
    <h3 className="mt-4 text-xl font-semibold sm:text-2xl md:max-w-[280px] md:text-xl lg:text-2xl">
      {title}
    </h3>
    <p className="mt-2 text-base text-gray-600 sm:text-lg md:max-w-[300px] md:text-base lg:text-xl">
      {description}
    </p>
  </div>
);

const MobileFeatures: React.FC = () => {
  const features: FeatureSectionProps[] = [
    {
      title: 'Responsive Mobile Solutions',
      description:
        'Enjoy consistent and engaging experiences across devices with our mobile-friendly solutions.',
      imageSrc: '/f_01.png',
      imageAlt: 'Mobile design',
    },
    {
      title: 'E-Commerce Excellence',
      description:
        'Elevate your online store with user-friendly interfaces and secure payment gateways.',
      imageSrc: '/f_02.png',
      imageAlt: 'E-commerce icons',
    },
    {
      title: 'Dynamic Content Platforms',
      description:
        'Empower content creators with dynamic platforms fostering engagement and personalization.',
      imageSrc: '/f_03.png',
      imageAlt: 'Content platform analytics',
    },
  ];

  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center px-4 py-8 md:max-w-none">
      <h2 className="mb-6 text-center text-4xl font-extrabold md:text-5xl">
        Empowerment at Your Fingertips
      </h2>
      <p className="mb-10 w-full text-center md:w-3/4 lg:w-2/4">
        Explore the range of industries we&apos;ve served and the impactful
        solutions we&apos;ve crafted for our clients.
      </p>
      <div className="container grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-1">
        {features.map((feature, index) => (
          <FeatureSection key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default MobileFeatures;
