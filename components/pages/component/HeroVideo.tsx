export default function HeroVideo() {
  return (
    <section className="relative h-[70vh] w-full">
      <div className="relative aspect-auto size-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 size-full object-cover"
        >
          <source
            src={process.env.VIDEO_HERO_URL}
            type={process.env.VIDEO_HERO_TYPE}
          />
        </video>
        <div
          className="absolute inset-0 bg-white/30 dark:bg-black/85"
          aria-hidden="true"
        ></div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center xl:flex-row">
        <div className="relative z-20 m-0 flex flex-col justify-center px-4 font-robotomono text-4xl font-light uppercase text-white md:px-0">
          comentanos que te gustaría evaluar
        </div>
        <div>
          <button className="text-light mt-10 w-96 rounded border border-white px-5 py-2 text-2xl text-white hover:border-black hover:bg-white hover:text-black xl:ml-10 xl:mt-0">
            SEGUIR
          </button>
        </div>
      </div>
    </section>
  );
}
