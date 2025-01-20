import { ComponentProps } from '@/components/types';

export default function HeroVideo({ data }: { data: ComponentProps }) {
  return (
    <section className="relative h-[900px] w-full">
      <div className="relative aspect-auto size-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 size-full object-cover"
        >
          <source src={data?.videoUrl || ''} type={data.videoType || 'mp4'} />
        </video>
        <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white xl:flex-row">
        <div className="relative z-20 m-0 flex flex-col justify-center px-4 font-roboto text-4xl font-semibold uppercase md:px-0">
          cuéntanos que te gustaría evaluar
        </div>
        <div>
          <button className="text-light mt-10 w-96 rounded border border-white px-5 py-2 text-2xl hover:border-black hover:bg-white hover:text-black lg:border-2 xl:ml-10 xl:mt-0">
            SEGUIR
          </button>
        </div>
      </div>
    </section>
  );
}
