import { CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";

interface PricingPlanProps {
  title: string;
  price: string;
  features: string[];
  isRecommended?: boolean;
}

const PricingPlan = ({
  title,
  price,
  features,
  isRecommended,
}: PricingPlanProps) => (
  <div
    className={`border rounded-lg p-6 shadow-md transition-transform duration-300 ${isRecommended ? "bg-blue-100 border-blue-600" : "bg-white border-gray-200"}`}
  >
    {isRecommended && (
      <div className="absolute top-4 right-2 bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded">
        Recommended
      </div>
    )}
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      {title}
    </h2>
    <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
      {price}
    </p>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      Features:
    </h3>
    <ul className="space-y-2 mb-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
    <a
      href="/upload"
      className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded text-center transition-colors duration-300"
    >
      Get Started
    </a>
  </div>
);

const Pricing = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "$9/month",
      features: [
        "Upload up to 5 PDFs",
        "Basic chat functionality",
        "Access to FAQs",
      ],
    },
    {
      title: "Pro Plan",
      price: "$19/month",
      features: [
        "Upload unlimited PDFs",
        "Advanced chat functionality",
        "Document analysis tools",
        "Priority support",
      ],
      isRecommended: true,
    },
    {
      title: "Enterprise Plan",
      price: "$49/month",
      features: [
        "Custom solutions",
        "Dedicated account manager",
        "API access",
        "Enhanced security features",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <header>
        <title>Pricing - PDF Chat Service</title>
        <meta
          name="description"
          content="Explore the pricing plans for our innovative PDF chat service powered by LangChain, Next.js, and Cohere."
        />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Pricing Plans
        </h1>
        <section className="mb-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Choose a plan that suits your needs and start interacting with your
            PDF documents today!
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isRecommended={plan.isRecommended}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Pricing;
