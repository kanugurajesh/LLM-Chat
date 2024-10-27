import { ArrowRight, MessageSquare, FileText, Zap, Lock } from "lucide-react";
import Navbar from "../components/Navbar";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <header>
        <title>About Our PDF Chat Service</title>
        <meta
          name="description"
          content="Learn about our innovative PDF chat service powered by LangChain, Next.js, and Cohere"
        />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          About Our PDF Chat Service
        </h1>

        <section className="mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Welcome to our cutting-edge PDF chat service! We've combined the
            power of LangChain, Next.js, and Cohere to create a fast, intuitive,
            and intelligent way to interact with your PDF documents.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our application allows you to upload PDFs and engage in natural
            language conversations about their content, making information
            retrieval and document analysis easier than ever.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6 text-blue-600" />}
              title="Intelligent Chat"
              description="Engage in natural conversations about your PDF content using advanced language models."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-blue-600" />}
              title="PDF Processing"
              description="Easily upload and process PDF documents for instant chat capabilities."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-blue-600" />}
              title="Fast Performance"
              description="Experience lightning-fast responses and smooth interactions powered by Next.js."
            />
            <FeatureCard
              icon={<Lock className="w-6 h-6 text-blue-600" />}
              title="Secure & Private"
              description="Your documents and conversations are kept secure and private at all times."
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Our Technology Stack
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  LangChain:
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {" "}
                  Powering our language models and chat capabilities.
                </span>
              </div>
            </li>
            <li className="flex items-start">
              <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Next.js:
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {" "}
                  Providing a fast, server-side rendered React framework for our
                  frontend.
                </span>
              </div>
            </li>
            <li className="flex items-start">
              <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Cohere:
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {" "}
                  Enhancing our natural language processing capabilities.
                </span>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Get Started
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Ready to revolutionize the way you interact with your PDF documents?
            Start chatting with your PDFs today!
          </p>
          <a
            href="/upload"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Upload Your First PDF
          </a>
        </section>
      </main>
    </div>
  );
};

export default About;
