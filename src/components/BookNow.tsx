"use client";
import { useState } from 'react';

const steps = [
  'Service Selection',
  'Date & Time',
  'Your Information',
  'Payments',
];

export default function BookNowSection() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col justify-between p-4">
        <div>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-3 py-3 mb-2 rounded-md ${
                index === currentStep
                  ? 'bg-white text-blue-900 font-semibold'
                  : 'bg-blue-800 hover:bg-blue-700'
              }`}
            >
              <span>
                {index === 0 && '🗂️'}
                {index === 1 && '📅'}
                {index === 2 && '👤'}
                {index === 3 && '💳'}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
        <div className="text-sm border-t border-blue-700 pt-4">
          <p className="text-gray-300 font-semibold mb-1">Get in Touch</p>
          <a href="mailto:creeksportsclub@gmail.com" className="text-white hover:underline">
            creeksportsclub@gmail.com
          </a>
        </div>
        <button className="mt-4 flex items-center gap-1 text-white text-sm hover:underline">
          Collapse menu →
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{steps[currentStep]}</h2>

        {/* Placeholder Content Per Step */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <label className="block font-medium text-sm text-gray-700">
              * Service:
              <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option>Select Service</option>
                <option>Single Court 1 (6am - 5pm)</option>
                <option>Double Court</option>
              </select>
            </label>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <select className="border px-3 py-2 rounded-md">
                <option>August</option>
              </select>
              <select className="border px-3 py-2 rounded-md">
                <option>2025</option>
              </select>
              <select className="border px-3 py-2 rounded-md">
                <option>1h (PKRs 1,500.00)</option>
              </select>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(31)].map((_, i) => (
                <button key={i} className="p-2 rounded bg-white border hover:bg-blue-100">
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First Name" className="border p-2 rounded w-full" />
            <input placeholder="Last Name" className="border p-2 rounded w-full" />
            <input placeholder="Email" className="border p-2 rounded w-full" />
            <input placeholder="Phone" className="border p-2 rounded w-full" />
            <div className="col-span-2">
              <p className="text-sm mb-2">
                Meezan Bank <br /> Acct Title: SPORTS ARENA <br /> Acct No: 99780112020269
              </p>
              <p className="text-sm mb-4">
                1hr — Rs 1,500 | 1hr 30mins — Rs 2,250 | 2hrs — Rs 3,000 | 2hrs 30mins — Rs 3,750 | 3hrs — Rs 4,500
              </p>
              <input type="file" className="border p-2 rounded w-full" />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-600 mb-4">🎉 Congratulations</h3>
            <p>Appointment ID #5252</p>
            <p>August 30, 2025 — 6:30 AM</p>
            <p>Service: Single Court 1 (6am - 5pm)</p>
            <p>Payment: PKRs 1,500.00 - On-site</p>
            <p>Your Name: Ghayas Ali</p>
            <p>Email: ghayas110@gmail.com</p>
            <p>Phone: 0300 266156</p>
            <div className="mt-4 flex justify-center gap-4">
              {['Google', 'Outlook', 'Yahoo', 'Apple'].map((cal) => (
                <button key={cal} className="border p-2 rounded hover:bg-gray-100">
                  {cal}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-8 text-right">
          {currentStep < 3 && (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Continue
            </button>
          )}
          {currentStep === 3 && (
            <button className="bg-blue-600 text-white px-6 py-2 rounded">Finish</button>
          )}
        </div>
      </main>
    </section>
  );
}
