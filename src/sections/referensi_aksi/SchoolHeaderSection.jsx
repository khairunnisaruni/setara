const SchoolHeaderSection = ({ data }) => {
  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {data.name}
      </h1>

      <img
        src={data.image}
        alt={data.name}
        className="w-full h-80 object-cover rounded-xl"
      />
    </div>
  );
};

export default SchoolHeaderSection;
