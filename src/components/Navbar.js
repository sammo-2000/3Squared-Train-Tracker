import React from 'react'

function Navbar() {
  return (
    <div className="shadow-box">
      <div className='absolute top-[5.5rem] left-0 w-1/12 h-1/1 flex-col text-center z-[1000] m-3 rounded-lg overflow-hidden shadow-box' style={{
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
      }}>
        {/* nav content */}
        <img src="https://3squared.com/wp-content/webp-express/webp-images/uploads/2023/10/3Squared-Logo-white.png.webp" alt="3Squared Logo" />
        <strong><h1>Navigation</h1></strong>
        <h3 className='m-1 hover:bg-white rounded-lg'>Test</h3>
        <h3 className='m-1 hover:bg-white rounded-lg'>Test</h3>
        <h3 className='m-1 hover:bg-white rounded-lg'>Test</h3>
        <h3 className='m-1 hover:bg-white rounded-lg'>Test</h3>
      </div>
    </div>
  )
}

export default Navbar