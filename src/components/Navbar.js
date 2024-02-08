import React from 'react'

function Navbar() {
  return (
    <div className='absolute top-[5.5rem] left-0 w-1/12 h-1/1 bg-gray-400 flex-col text-center z-[1000] m-3 rounded-lg'>
    {/* nav content */}
    <img src="#" alt="3Squared Logo" />
    <strong><h1>Navigation</h1></strong>
    <h3 className='m-1 hover:bg-white rounded-lg'>Test</h3>
    <h3 className='m-1 hover:bg-white rounded-lg'>Test</h3>
    <h3 className='m-1 hover:bg-white rounded-lg'>Test</h3>
    <h3 className='m-1 hover:bg-white rounded-lg'>Test</h3>
  </div>
  )
}

export default Navbar