import Banner1 from '@/components/shared/Banner/Banner1';
import { HeroImage } from '@/components/shared/Banner/HeroImage';
import { BannerData } from '@/sanity/fetchs/bannerFetch';
import { getCurrentPage, getHomeData } from '@/sanity/fetchs/pagesFetch';
import Banner3Features from '@/components/shared/Banner/Banner3Features';
import IconList from '@/components/shared/Card/ServiceIconList';
import { Highlight1 } from '@/components/shared/Highlight1';
import { mockServices } from '@/sanity/lib/fetchMockData';
import { PortableText } from 'next-sanity';
import { type Page } from '@/sanity/fetchs/pagesFetch';

export default async function PageTemplate({ service }: { service?: string }) {
  let currentPage: Page = null;
  if (service) {
    currentPage = await getCurrentPage(service);
  } else {
    currentPage = await getHomeData();
  }
  console.log('currentPage', currentPage);
  if (!currentPage) {
    return <div>Error al cargar la lista de páginas.</div>;
  }
  const banner = currentPage.components?.find(
    (comp) => comp._type === 'banner'
  );

  if (!banner) {
    return <div>Error al cargar los banners.</div>;
  }

  const banner1 = currentPage.components?.find(
    (comp) => comp.typeComponent === 'banner1'
  );

  const heroImage = currentPage.components?.find(
    (comp) => comp.typeComponent === 'heroImage'
  );

  const banner3Features = currentPage.components?.find(
    (comp) => comp.typeComponent === 'banner3Features'
  );

  return (
    <>
      {currentPage.isHome && <HeroImage data={heroImage as BannerData} />}
      {banner1 && (
        <div className="mb-5 py-10 lg:mb-20">
          <Banner1 data={banner1 as BannerData} />
        </div>
      )}
      {banner3Features && (
        <div className="mb-5 py-10 lg:mb-20">
          <Banner3Features data={banner3Features as BannerData} />
        </div>
      )}
      <IconList services={mockServices} />
      <div className="py-20">
        <Highlight1
          title="25 Años De Experiencia Con Excelente Resultados!"
          description="En MBA Ingeniería, nuestra especialidad es proveer soluciones técnicas
        de vanguardia, personalizadas para una amplia gama de espacios,
        incluyendo inmobiliario residencial y corporativo, industrias, centros
        médicos y comerciales"
        />
      </div>
      <div className="flex flex-col gap-14 md:flex-row">
        {/* Main Content: Ensure main content is on the left */}
        <div className="order-2 md:order-1 md:w-3/4">
          <div className="prose prose-sm max-w-none">
            <PortableText value={currentPage.content || []} components={{}} />
          </div>
        </div>
      </div>
    </>
  );
}
