'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    image: '/banner1.jpg',
    subtitle: 'ALL AGES WELCOME',
    title: 'Book Your Tennis Court',
    buttonText: 'VIEW COURTS'
  },
  {
    id: 2,
    image: '/banner2.jpg',
    subtitle: 'PLAY WITH ENERGY',
    title: 'Reserve a Court Today',
    buttonText: 'BOOK NOW'
  },
  {
    id: 3,
    image: '/banner3.jpg',
    subtitle: 'TRAIN LIKE A PRO',
    title: 'Tennis Practice Sessions',
    buttonText: 'JOIN SESSION'
  }
];


export default function BannerSlider() {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        effect="fade"
        loop={true}
        slidesPerView={1}
        className="h-[400px] md:h-[600px]"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Text overlay */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div className="text-white md:text-black max-w-3xl">
                  <p className="text-xs md:text-sm font-semibold tracking-widest text-white mb-1 uppercase">
                    {slide.subtitle}
                  </p>
                  <h2 className="text-3xl md:text-6xl font-extrabold leading-tight mb-4 text-white">
                    {slide.title}
                  </h2>
                  <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-green-700 transition-all" onClick={() => {window.location.href = '/login';}}>
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
