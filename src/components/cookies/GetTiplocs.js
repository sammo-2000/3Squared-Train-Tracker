import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { UseTrackedLocations } from "../../hooks/TrackedLocationsHook";

const GetTiplocs = () => {
    const { setTrackedLocations } = UseTrackedLocations();

    const loadTrackedLocations = () => { 
        const cookies = Cookies.get();
        Object.keys(cookies).forEach(cookieName => {
          if (cookieName.startsWith('tiploc_')) {
            const tiploc = JSON.parse(cookies[cookieName]);
            const tiplocName = cookieName.replace('tiploc_', ''); // Remove 'tiploc_' prefix
            setTrackedLocations(prevLocations => {
              if (!prevLocations.some(location => location.Tiploc === tiplocName)) {

                return [...prevLocations, tiploc];
              }
              return prevLocations;
            });
          }
        });
      }

  return (
    <>
    {loadTrackedLocations()}
    </>
  );
};



export default GetTiplocs;