import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <header>
        <title>Contact Us - PDF Chat Service</title>
        <meta
          name="description"
          content="Get in touch with us for any inquiries regarding our PDF chat service."
        />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Contact Us
        </h1>

        <section className="mb-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            We’d love to hear from you! Please fill out the form below or reach out to us directly.
          </p>
        </section>

        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full p-2 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-2 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <div className="mb-4 flex items-center">
              <MapPin className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">123 PDF Chat Lane, Document City, DC 12345</span>
            </div>
            <div className="mb-4 flex items-center">
              <Phone className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">+1 (234) 567-8901</span>
            </div>
            <div className="mb-4 flex items-center">
              <Mail className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">support@pdfchatservice.com</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
