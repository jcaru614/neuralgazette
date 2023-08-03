import Layout from '@/components/Layout';

const Contact = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission here
    console.log('submit');
  };

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-neural-network mb-4">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="font-semibold">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-semibold">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="border rounded-md px-4 py-2 w-full"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-deep-blue text-white font-semibold py-2 px-4 rounded hover:bg-tungsten transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
          <div className="mt-8">
            <p className="text-lg font-semibold">Need immediate assistance?</p>
            <p className="mt-2">
              Call us at:{' '}
              <a href="tel:4089605472" className="text-tungsten">
                408-960-5472
              </a>
            </p>
          </div>
          <div className="mt-8">
            <p className="text-lg font-semibold">Or chat with our chatbot:</p>
            {/* Replace the chatbot code with your preferred chatbot integration */}
            <div className="mt-2">
              <p>Chatbot goes here</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contact;
