'use client';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Hero */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="w-12 h-1 bg-pink-500 mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            This Privacy Policy explains how Creek Sports Club (“we”, “us”, “our”) collects, uses, shares,
            and protects your information when you use our websites, mobile experiences, facilities, and services.
          </p>
        
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <nav className="sticky top-24 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <h2 className="text-sm font-semibold">On this page</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ['scope','Scope & Who We Are'],
                ['data-we-collect','Data We Collect'],
                ['how-we-use','How We Use Your Data'],
                ['legal-bases','Legal Bases'],
                ['sharing','Sharing & Processors'],
                ['cookies','Cookies & Similar Tech'],
                ['payments','Payments'],
                ['cctv','CCTV & Venue Security'],
                ['data-retention','Data Retention'],
                ['your-rights','Your Rights'],
                ['security','Security'],
                ['international','International Transfers'],
                ['children','Children'],
                ['changes','Changes to this Policy'],
                ['contact','Contact Us'],
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="block rounded-md px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main */}
        <article className="lg:col-span-8 xl:col-span-9 prose prose-gray dark:prose-invert max-w-none">
          <section id="scope" className="scroll-mt-24">
            <h2>Scope &amp; Who We Are</h2>
            <p>
              This policy covers information collected through our booking systems, websites, customer support,
              in-venue interactions, coaching programs, events, and affiliated services operated by Creek Sports Club.
            </p>
          </section>

          <section id="data-we-collect" className="scroll-mt-24">
            <h2>Data We Collect</h2>
            <ul>
              <li><strong>Identity &amp; Contact:</strong> name, phone, email, identifiers for account/profile.</li>
              <li><strong>Booking &amp; Usage:</strong> court reservations, check-in/out, program enrollments, cancellations, no-shows.</li>
              <li><strong>Payment:</strong> amount, method/last4 or token from payment processor (we don’t store full card data).</li>
              <li><strong>Communications:</strong> messages, support requests, feedback, incident reports.</li>
              <li><strong>Device &amp; Technical:</strong> IP, device/browser metadata, cookie identifiers, analytics events.</li>
              <li><strong>Venue Security:</strong> CCTV footage and access logs where lawfully operated (see CCTV section).</li>
            </ul>
          </section>

          <section id="how-we-use" className="scroll-mt-24">
            <h2>How We Use Your Data</h2>
            <ul>
              <li>Provide and administer bookings, memberships, programs, and customer support.</li>
              <li>Operate our venues safely and fairly (including eligibility, time management, and incident handling).</li>
              <li>Process payments, prevent fraud, and manage accounts.</li>
              <li>Send service messages (booking alerts, schedule changes, policy updates).</li>
              <li>Improve services via analytics, quality assurance, and facility planning.</li>
              <li>With consent (where required), send marketing about offers, events, or services; you can opt out anytime.</li>
              <li>Comply with law and enforce our terms and venue policies.</li>
            </ul>
          </section>

          <section id="legal-bases" className="scroll-mt-24">
            <h2>Legal Bases</h2>
            <p>
              Depending on your location, we rely on one or more of the following: performance of a contract (e.g., bookings),
              legitimate interests (e.g., site safety, basic analytics), consent (e.g., marketing), and legal obligations.
            </p>
          </section>

          <section id="sharing" className="scroll-mt-24">
            <h2>Sharing &amp; Processors</h2>
            <p>
              We share data with vetted service providers who process it on our behalf (e.g., hosting, payments, SMS/email,
              analytics). We may share information if required by law, to protect rights and safety, to investigate fraud or
              incidents, or during a business transition. We do not sell your personal data.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-24">
            <h2>Cookies &amp; Similar Technologies</h2>
            <p>
              We use essential cookies to run the site and optional analytics/marketing technologies to improve performance
              and personalize communications. You can control optional cookies through your browser or our preference tools (if provided).
            </p>
          </section>

          <section id="payments" className="scroll-mt-24">
            <h2>Payments</h2>
            <p>
              Payments are handled by third-party processors. We receive limited information (e.g., success status, amount,
              last4 or token) for reconciliation and support. For card details and security, please refer to the payment
              processor’s own privacy notices available at checkout.
            </p>
          </section>

          <section id="cctv" className="scroll-mt-24">
            <h2>CCTV &amp; Venue Security</h2>
            <p>
              To maintain a safe environment, certain venue areas may be monitored by CCTV in accordance with applicable law.
              Footage is retained for a limited period and accessed only by authorized personnel for security, incident
              investigation, or legal purposes.
            </p>
          </section>

          <section id="data-retention" className="scroll-mt-24">
            <h2>Data Retention</h2>
            <p>
              We keep personal data only as long as necessary for the purposes above, including accounting, dispute resolution,
              security, and legal compliance. Retention periods vary by data category and legal requirements.
            </p>
          </section>

          <section id="your-rights" className="scroll-mt-24">
            <h2>Your Rights</h2>
            <p>
              Subject to local law, you may have rights to access, correct, delete, or port your data; to object to or
              restrict certain processing; and to withdraw consent (for consent-based processing). We will respond to valid
              requests within applicable timeframes. If we cannot fulfill a request due to legal obligations, we’ll explain why.
            </p>
          </section>

          <section id="security" className="scroll-mt-24">
            <h2>Security</h2>
            <p>
              We implement technical and organizational measures to protect personal data (e.g., encryption in transit, access
              controls, audit logging). No method is 100% secure; please use strong, unique passwords and notify us of any
              suspected account compromise.
            </p>
          </section>

          <section id="international" className="scroll-mt-24">
            <h2>International Transfers</h2>
            <p>
              Where cross-border transfers occur (e.g., to cloud providers), we use appropriate safeguards as required by law
              (such as contractual terms) to protect your information.
            </p>
          </section>

          <section id="children" className="scroll-mt-24">
            <h2>Children</h2>
            <p>
              Our services are intended for general audiences. Where junior coaching or youth programs are offered, we collect
              guardian contact details and necessary participant information only for program administration and safety.
            </p>
          </section>

          <section id="changes" className="scroll-mt-24">
            <h2>Changes to this Policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be highlighted on this page or communicated
              through service messages.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2>Contact Us</h2>
            <p>
              For privacy requests or questions, please contact our support team at the venue or via the contact options
              listed on our website. We’ll reply as soon as possible.
            </p>
          </section>

          {/* Footnote aligning with existing policy docs */}
          {/* <div className="mt-10 rounded-xl border border-amber-200/40 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900/40 p-4 text-amber-800 dark:text-amber-200 text-sm">
            Note: Privacy practices operate alongside on-court policies (e.g., entry/booking rules) and Terms &amp; Conditions. :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5}
          </div> */}
        </article>
      </section>
    </main>
  );
}
