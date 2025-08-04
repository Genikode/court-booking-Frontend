'use client';

const CoachSections = () => {
  const skills = [
    { name: 'Leaps', value: 45 },
    { name: 'Turns', value: 69 },
    { name: 'Positioning', value: 88 },
    { name: 'Single and Double turns', value: 46 },
    { name: 'Toe touch', value: 69 },
    { name: 'Spirals', value: 37 },
    { name: 'Body halves', value: 89 },
    { name: 'Retire', value: 44 },
    { name: 'Jazz walks', value: 38 },
  ];

  return (
    <section className="py-20 px-4 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Side: About Text */}
        <div>
          <h3 className="text-2xl font-bold mb-4">About</h3>
          <p className="mb-4">
            Martha’s life has taken a lot of amazing u-turns over the last 40 years...
          </p>
          <p className="mb-4">
            At the age of 15, immediately after moving from Cuba to the US in 1976, Martha
            has begun to seek what her professional career may be...
          </p>
          <p className="mb-4">
            Eventually, after working at numerous nightclubs in Florida, Nevada and LA, she
            felt that dancing was the right move for her... Considering the high culture of
            Latin dances present in Cuba at all times, dancing felt very much natural to her…
          </p>
          <p className="mb-4">
            So after saving a principal capital for 9 years, in 1985 Stephania finally founded
            her very own dancing studio in Indiana!
          </p>
          <p className="mb-4">
            Fast forward 30 years later and her studio has grown to be one of the most popular
            ones in the state, with a diverse and universal range of both vivid dancing styles
            and a team of bold dancing instructors!
          </p>

          <h4 className="text-xl font-bold mt-8 mb-2">
            This dance instructor works with the following styles:
          </h4>
          <ul className="list-disc pl-5 text-[#fd2e69] space-y-1">
            <li>Salsa</li>
            <li>Rumba</li>
            <li>Quickstep</li>
            <li>Jive</li>
          </ul>
        </div>

        {/* Right Side: Skills Progress */}
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1 font-semibold text-sm">
                <span>{skill.name}</span>
                <span>{skill.value}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-[#fd2e69] rounded-full"
                  style={{ width: `${skill.value}%` }}
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
