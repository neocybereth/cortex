export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              Cortex ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our personal health data analysis application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Oura Ring Data</h3>
            <p className="text-gray-700 mb-4">
              With your explicit consent, we access your Oura Ring data including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Personal information (age, gender, height, weight)</li>
              <li>Sleep data (duration, quality, stages)</li>
              <li>Activity data (steps, calories, movement)</li>
              <li>Readiness scores and recommendations</li>
              <li>Heart rate and cardiovascular data</li>
              <li>Workout sessions and tags</li>
              <li>Stress and recovery metrics</li>
              <li>Ring configuration settings</li>
            </ul>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">Usage Data</h3>
            <p className="text-gray-700 mb-4">
              We may collect information about how you interact with our application, including queries made and features used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Provide personalized health insights and analysis</li>
              <li>Generate AI-powered recommendations based on your data</li>
              <li>Improve our application's functionality and user experience</li>
              <li>Respond to your queries and provide customer support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Storage and Security</h2>
            <p className="text-gray-700 mb-4">
              Your health data is extremely sensitive, and we take its protection seriously:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Data is processed in real-time and not permanently stored on our servers</li>
              <li>API tokens are handled securely and never logged or stored</li>
              <li>All data transmission uses industry-standard encryption</li>
              <li>We implement appropriate technical and organizational measures to protect your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Oura API:</strong> To access your health data (with your consent)</li>
              <li><strong>OpenAI:</strong> To provide AI-powered analysis and insights</li>
              <li><strong>Vercel:</strong> For application hosting and deployment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Revoke access to your Oura data at any time</li>
              <li>Request information about how your data is processed</li>
              <li>Request deletion of any data we may have collected</li>
              <li>Contact us with questions or concerns about your privacy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We do not permanently store your health data. Data is processed in real-time for analysis and discarded after processing. Usage logs may be retained for up to 30 days for debugging and improvement purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibent text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700">
              Email: seanm077@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}