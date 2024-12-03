"use client";
import { useEffect, useState } from 'react';
import Spinner from './conditions/Spinner';

const Location = () => {

    const [locationUrl, setLocationUrl] = useState('');

    useEffect(()=> {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocationUrl(`https://www.google.com/maps/search/?api=1&query=${position.coords.latitude}%2C${position.coords.longitude}`)
                }
            );
        };
    });

  return (
    <div>
        {
            locationUrl? <a href={locationUrl} target='_blank'>google maps</a>
            : <Spinner />
        }
    </div>
  );
};

export default Location;