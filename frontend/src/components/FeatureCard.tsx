interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-500 hover:scale-105">
      <div className="flex justify-center mb-6">{icon}</div>
      <h4 className="text-2xl font-semibold mb-4">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
