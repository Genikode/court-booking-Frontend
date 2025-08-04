'use client';

import Image from 'next/image';

const clients = [
  {
    name: 'Client Name',
    description: 'Client Description',
    image: '/instructors/instructors1.jpeg',
  },
  {
    name: 'Client Name',
    description: 'Client Description',
    image: '/instructors/instructors2.jpeg',
  },
  {
    name: 'Client Name',
    description: 'Client Description',
    image: '/instructors/instructors3.jpeg',
  },
  {
    name: 'Client Name',
    description: 'Client Description',
    image: '/instructors/instructors4.jpeg',
  },
  {
    name: 'Client Name',
    description: 'Client Description',
    image: '/instructors/instructors5.jpeg',
  },
  {
    name: 'Client Name',
    description: 'Client Description',
    image: '/instructors/instructors2.jpeg',
  },
];

const ClientsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <div key={index} className="text-center">
              <div className="relative w-full h-[250px]">
                <Image
                  src={client.image}
                  alt={client.name}
                  layout="fill"
                  className="object-cover rounded"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold">{client.name}</h3>
              <p className="text-pink-600 text-sm">{client.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
