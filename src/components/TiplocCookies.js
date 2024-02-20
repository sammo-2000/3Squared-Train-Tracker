import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { UseSelectedTiploc } from "../hooks/SelectedTiplocHook";

// const loadTrackedLocations = () => { 
//     const cookies = Cookies.get();
//     Object.keys(cookies).forEach(cookieName => {
//       if (data.some(location => location.Tiploc.toString() === cookieName)) {
//         const tiploc = JSON.parse(cookies[cookieName]);
//         // setSelectedTiploc(prevLocations => [...prevLocations, tiploc]);
//         setSelectedTiploc([...selectedTiploc, tiploc]);
//         console.log("The selected tiploc ",selectedTiploc);
//       }
//     }, [selectedTiploc]);
//     console.log("Tracked locations", selectedTiploc);
//   }

const TiplocCookies = () => {
    const { selectedTiploc, setSelectedTiploc } = UseSelectedTiploc();

    // const loadTrackedLocations = () => { 
    //     const cookies = Cookies.get();
    //     Object.keys(cookies).forEach(cookieName => {
    //       if (cookieName.startsWith('tiploc_')) {
    //         const tiploc = JSON.parse(cookies[cookieName]);
    //         setSelectedTiploc(prevLocations => [...prevLocations, tiploc]);
    //       }
    //     });
    // }

    const loadTrackedLocations = () => { 
        const cookies = Cookies.get();
        Object.keys(cookies).forEach(cookieName => {
          if (cookieName.startsWith('tiploc_')) {
            const tiploc = JSON.parse(cookies[cookieName]);
            const tiplocName = cookieName.replace('tiploc_', ''); // Remove 'tiploc_' prefix
            setSelectedTiploc(prevLocations => {
              // Check if tiploc is already in selectedTiploc
              console.log("Name",tiplocName);
              if (!prevLocations.some(location => location.Tiploc === tiplocName)) {
                // If it's not, add it
                console.log("previous tiploc 2",prevLocations);
                console.log("prefix tiploc ",selectedTiploc);
                return [...prevLocations, tiploc];
              }
              // If it is, return the previous state
              return prevLocations;
            });
          }
        });
      }

    // const [data, setData] = useState([]);

  return (
    <>
    {loadTrackedLocations()}
    {
        // useEffect(() => {
        //     loadTrackedLocations();
        // }, [selectedTiploc])
    }
    </>
  );
};



export default TiplocCookies

// const loadTrackedLocations = () => { 
//     const cookies = Cookies.get();
//     Object.keys(cookies).forEach(cookieName => {
//       if (data.some(location => location.Tiploc.toString() === cookieName)) {
//         const tiploc = JSON.parse(cookies[cookieName]);
//         setSelectedTiploc(prevLocations => [...prevLocations, tiploc]);
//       }
//     });
//   }
  