import Image from 'next/image';

const stats = [
  { value: '4+', label: 'COURTS' },
  { value: '500', label: 'MEMBERS' },
  { value: '24/7', label: 'AVAILABLE' },
  { value: '100%', label: 'PLAYING EXPERIENCE' },
];

export default function StatsBanner() {
  return (
    <section className="relative h-52 md:h-64 flex items-center justify-center overflow-hidden">
      <Image
        src="/banner1.jpg" // Replace with actual image path
        alt="Creek Sports Club Courts"
        fill
        className="object-cover object-center"
      />

      <div className="relative z-10 flex justify-center items-center gap-6 md:gap-12 text-white text-center px-4">
        {stats.map((item, index) => (
          <div key={index} className="px-3 border-r border-white last:border-r-0">
            <div className="text-3xl md:text-4xl font-extrabold">{item.value}</div>
            <div className="text-sm md:text-base text-red-500 font-semibold tracking-widest uppercase">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}