import React, { useState } from 'react';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';
import icon5 from '../assets/icon5.png';
import logo from '../assets/3slogo.webp';

// ICON REFERENCES: https://www.flaticon.com/free-icon/location_8073556?related_id=8073556
const icons = { // This is where you add to the navbar
  1: icon1,
  2: icon2,
  3: icon3,
  4: icon4,
  5: icon5,
};

function Navbar() {
  const [activeContent, setActiveContent] = useState(null);
  const handleIconClick = (contentId) => {
    console.log(`Icon clicked: ${contentId}`);
    setActiveContent(contentId);
  };

  return (

    <div className="shadow-box">
      <div className='absolute top-[5.5rem] left-0 w-[4%] h-1/1 flex-col text-center z-[1000] m-3 rounded-lg overflow-hidden shadow-box' 
      style={{
        backgroundColor: '#fff',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
      }}>
        {/* All of the navigation stuff */}
        <img src={logo} alt="3Squared Logo" />
        {/* REFERENCE: https://stackoverflow.com/questions/40803828/how-can-i-map-through-an-object-in-reactjs */}
        {Object.entries(icons).map(([id, iconSrc]) => ( // Goes through each of the icons objects and renders them in the navbar with there set icon
          <div key={id} className='hover:bg-[#D8D8D8] rounded-lg max-h-12 flex justify-center w-[90%] mx-[5%] m-4' onClick={() => handleIconClick(Number(id))}>
            <img className='max-h-12' src={iconSrc} alt={`Icon ${id}`} />
          </div>
        ))}
      </div>

      {activeContent && (
        <div className='absolute top-0 left-0 w-[15%] z-[1000] h-full bg-white shadow-lg'>
          <button onClick={() => setActiveContent(null)} style={{ cursor: 'pointer', position: 'absolute', top: 20, right: 20 }}>
            Close
          </button>
          {/* This is where I check for the id of the active content then display content relating to that ID */}
          {activeContent === 1 && <div>Section 1</div>}
          {activeContent === 2 && <div>Section 2</div>}
          {activeContent === 3 && <div>Section 3</div>}
          {activeContent === 4 && <div>Section 4</div>}
          {activeContent === 5 && <div>Section 5</div>}
        </div>
      )}

    </div>
  );
}

export default Navbar;
