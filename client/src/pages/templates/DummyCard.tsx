interface DummyCardProps {
  title: string;
  type: string;
  imageUrl: string;
}

const DummyCard: React.FC<DummyCardProps> = ({ title, type, imageUrl }) => {
  return (
    <div className="border p-4 rounded-md shadow">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-500 mb-4">{type}</p>
      <button>♥</button>
    </div>
  );
};

export default DummyCard;
