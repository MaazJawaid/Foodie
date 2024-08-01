// AddressInput.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const AddressInput = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
    >
      <Autocomplete
        onLoad={(autocomplete) => console.log('Autocomplete loaded:', autocomplete)}
        onPlaceChanged={() => handlePlaceSelect(autocomplete.getPlace())}
      >
        <input
          type="text"
          placeholder="Enter your address"
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default AddressInput;
