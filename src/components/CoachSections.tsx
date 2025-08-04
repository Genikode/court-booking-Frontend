'use client';

const CoachSections = () => {
  const features = [
    { name: 'Court Surface Quality', value: 95 },
    { name: 'Lighting', value: 90 },
    { name: 'Cleanliness', value: 92 },
    { name: 'Seating Comfort', value: 85 },
    { name: 'Accessibility', value: 88 },
    { name: 'Equipment Availability', value: 80 },
    { name: 'Safety Measures', value: 93 },
    { name: 'Booking Convenience', value: 87 },
    { name: 'Parking Facility', value: 89 },
  ];

  return (
    <section className="py-20 px-4 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Side: About Text */}
        <div>
          <h3 className="text-2xl font-bold mb-4">About Our Tennis Courts</h3>
          <p className="mb-4">
            Creek Sports Club offers premium tennis courts designed for players of all levels. Our courts feature high-quality surfaces, excellent lighting, and a clean, safe environment for your best game.
          </p>
          <p className="mb-4">
            Whether you’re practicing solo, playing doubles, or joining a tournament, our facilities provide everything you need for a great tennis experience.
          </p>
          <p className="mb-4">
            We focus on convenience and comfort, with easy booking, accessible locations, and plenty of parking for all visitors.
          </p>
          <p className="mb-4">
            Our courts are regularly maintained to ensure top performance and safety, so you can focus on your game.
          </p>
          <p className="mb-4">
            Join us and enjoy the best tennis courts in the area, perfect for training, matches, and social play.
          </p>

          <h4 className="text-xl font-bold mt-8 mb-2">
            Our tennis courts are ideal for:
          </h4>
          <ul className="list-disc pl-5 text-[#fd2e69] space-y-1">
            <li>Singles Matches</li>
            <li>Doubles Matches</li>
            <li>Practice Sessions</li>
            <li>Group Lessons</li>
          </ul>
        </div>

        {/* Right Side: Court Features Progress */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1 font-semibold text-sm">
                <span>{feature.name}</span>
                <span>{feature.value}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-[#fd2e69] rounded-full"
                  style={{ width: `${feature.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoachSections;
