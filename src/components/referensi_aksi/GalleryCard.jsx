const GalleryCard = ({ item }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <img
          src={item.userAvatar}
          alt={item.username}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-medium text-sm">{item.username}</p>
          <p className="text-xs text-gray-500">{item.role}</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-3">{item.caption}</p>

      <div className="grid grid-cols-2 gap-2">
        {item.photos.map((img, index) => (
          <img
            key={index}
            src={img}
            className="w-full h-28 object-cover rounded-lg"
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryCard;
