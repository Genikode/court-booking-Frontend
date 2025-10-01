'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Printer, ArrowUpRight } from 'lucide-react';

export default function TermsPage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => window.print();

  const sections = [
    { id: 'bookings', title: 'Bookings', content: [
      'All bookings are subject to availability and confirmation by Creek Padel.',
      'Online bookings are final; once made, they cannot be refunded.',
    ]},
    { id: 'no-refunds', title: 'No Refunds', content: [
      'Cancellations are strictly non-refundable.',
      'However, amounts may be credited towards future bookings if notice is given at least 24 hours in advance.',
    ]},
    { id: 'late-cancellations', title: 'Late Cancellations & No-Shows', content: [
      'Cancellations made less than 24 hours before the scheduled slot or no-shows will be fully charged.',
    ]},
    { id: 'payment-settlement', title: 'Payment Settlement', content: [
      'All outstanding payments must be settled at the booking counter before the session start time.',
    ]},
    { id: 'damage-liability', title: 'Damage & Liability', content: [
      'Customers are responsible for any damaged or lost equipment, as well as property damage within the facility.',
      'Property damage will be charged as per actual repair or replacement costs.',
    ]},
    { id: 'equipment-charges', title: 'Equipment Charges', content: [
      'Customers are responsible for any damaged or lost equipment. The following charges apply:',
      '• Lost Ball: PKR 500 per ball',
      '• Racket (C-Grade): PKR 10,000',
      '• Racket (B-Grade): PKR 25,000',
      '• Racket (A-Grade): PKR 50,000',
    ]},
    { id: 'event-restrictions', title: 'Event Restrictions', content: [
      'Tournaments, events, coaching, or training sessions cannot be held under standard bookings. Special approval is required.',
    ]},
    { id: 'court-allocation', title: 'Court Allocation', content: [
      'Court allocation is at the discretion of Creek Padel management. Any available court may be assigned.',
    ]},
    { id: 'cancellation-rights', title: 'Cancellation Rights (By Creek Padel)', content: [
      'Creek Padel reserves the right to cancel bookings in cases of overbooking, maintenance, or unforeseen circumstances.',
      'In such cases, payments will be refunded or rescheduled.',
      'We are not liable for any associated costs or indirect losses.',
    ]},
    { id: 'liability', title: 'Personal Belongings', content: [
      'Creek Padel is not responsible for lost, stolen, or damaged personal items. Customers are advised to secure their belongings.',
    ]},
    { id: 'fnb', title: 'Outside Food & Beverages', content: [
      'Bringing outside food or drinks is strictly prohibited. Refreshments are available at Creek Café.',
    ]},
    { id: 'equipment-included', title: 'Equipment Included', content: [
      'Court bookings include rackets and balls. Players may bring their own equipment if preferred.',
    ]},
    { id: 'rain-policy', title: 'Rain Policy', content: [
      'No Preemptive Cancellations: Bookings will proceed as scheduled unless adverse weather is observed at the venue.',
      'Observation & Decision: If rain begins during play or conditions become unsuitable, Creek Padel staff will assess and decide on suspension or cancellation.',
      'Rescheduling: Interrupted or cancelled sessions due to rain can be rescheduled within 30 days, subject to availability.',
      'No Refunds: No monetary refunds will be issued for rain-affected bookings.',
      'Participant Safety: Safety remains the top priority. Play will be halted immediately in case of unsafe conditions.',
      'Booking Adjustments: Customers must coordinate with Creek Padel staff within 7 days to finalize rescheduling and adjustments.',
    ]},
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero / Header */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Terms & Conditions
              </h1>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                These terms govern use of Creek Padel courts, services, and facilities.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-1 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition"
              >
                Back to Home <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Meta line (optional to show when last updated is known) */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Creek Padel — Terms & Conditions
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar TOC */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <nav className="sticky top-24 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">On this page</h2>
            <ul className="mt-3 space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-md px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main body */}
        <div className="lg:col-span-8 xl:col-span-9">
          <article className="prose prose-gray dark:prose-invert lg:prose-lg max-w-none">
            {sections.map((s) => (
              <section id={s.id} key={s.id} className="scroll-mt-24">
                <h2>{s.title}</h2>
                {s.content.map((line, i) => {
                  // render simple "• ..." as list items automatically
                  if (line.trim().startsWith('•')) {
                    return null; // handled below
                  }
                  if (s.content.some((l) => l.trim().startsWith('•'))) {
                    // If this section has bullet lines, render a list below
                    return i === 0 ? <p key={i}>{line}</p> : null;
                  }
                  return <p key={i}>{line}</p>;
                })}
                {s.content.some((l) => l.trim().startsWith('•')) && (
                  <ul>
                    {s.content
                      .filter((l) => l.trim().startsWith('•'))
                      .map((l, idx) => (
                        <li key={idx}>{l.replace(/^•\s?/, '')}</li>
                      ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          {/* Footer note */}
          <div className="mt-10 rounded-xl border border-amber-200/40 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900/40 p-4 text-amber-700 dark:text-amber-200 text-sm">
            Note: By making a booking or using Creek Padel facilities, you acknowledge that you have
            read and agree to these Terms & Conditions.
          </div>
        </div>
      </section>
    </main>
  );
}
