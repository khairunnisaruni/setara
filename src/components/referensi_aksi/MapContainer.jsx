const MapContainer = () => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border">
      <iframe
        title="school-map"
        src="https://www.google.com/maps/embed?..."
        loading="lazy"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default MapContainer;
