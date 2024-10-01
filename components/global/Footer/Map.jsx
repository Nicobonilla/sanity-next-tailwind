import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const mapContainerStyle = {
    height: "250px",
    width: "100%",
  };

  // Replace with the coordinates of your fixed location
  const fixedLocation = {
    lat: -32.7593, // Latitude for the Statue of Liberty
    lng: -70.7331, // Longitude for the Statue of Liberty
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={fixedLocation}
        zoom={13}
      >
        {/* Place a marker at the fixed location */}
        <Marker position={fixedLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
