export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-black mb-8">Terms of Service</h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-black mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Agreement to Terms</h2>
            <p className="text-black mb-4">
              By accessing and using Cortex ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Description of Service</h2>
            <p className="text-black mb-4">
              Cortex is a personal health data analysis application that connects to your Oura Ring to provide AI-powered insights and analysis of your health and wellness data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">User Responsibilities</h2>
            <p className="text-black mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-black mb-4 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your Oura API credentials</li>
              <li>Use the Service only for personal, non-commercial purposes</li>
              <li>Not attempt to reverse engineer or compromise the Service</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Health Data and Medical Disclaimer</h2>
            <p className="text-black mb-4">
              <strong>IMPORTANT:</strong> Cortex is for informational purposes only and is not intended to:
            </p>
            <ul className="list-disc list-inside text-black mb-4 ml-4">
              <li>Provide medical advice, diagnosis, or treatment</li>
              <li>Replace consultation with qualified healthcare professionals</li>
              <li>Be used for medical emergencies or urgent health decisions</li>
            </ul>
            <p className="text-black mb-4">
              Always consult with your healthcare provider before making any health-related decisions based on information provided by the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Data Usage and Privacy</h2>
            <p className="text-black mb-4">
              By using the Service, you consent to the collection and use of your health data as described in our Privacy Policy. You acknowledge that:
            </p>
            <ul className="list-disc list-inside text-black mb-4 ml-4">
              <li>Your data will be processed to provide personalized insights</li>
              <li>Data may be processed by third-party AI services (OpenAI)</li>
              <li>You can revoke access to your data at any time</li>
              <li>We do not permanently store your health data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Intellectual Property</h2>
            <p className="text-black mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property of Cortex and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Limitation of Liability</h2>
            <p className="text-black mb-4">
              In no event shall Cortex, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Service Availability</h2>
            <p className="text-black mb-4">
              We strive to maintain the Service but cannot guarantee 100% uptime. The Service may be temporarily unavailable due to:
            </p>
            <ul className="list-disc list-inside text-black mb-4 ml-4">
              <li>Scheduled maintenance</li>
              <li>Technical difficulties</li>
              <li>Third-party service outages (Oura API, OpenAI, etc.)</li>
              <li>Other factors beyond our reasonable control</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Termination</h2>
            <p className="text-black mb-4">
              You may terminate your use of the Service at any time. We may terminate or suspend your access to the Service immediately, without prior notice, if you breach these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Changes to Terms</h2>
            <p className="text-black mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Governing Law</h2>
            <p className="text-black mb-4">
              These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Contact Information</h2>
            <p className="text-black mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-black">
              Email: seanm077@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}