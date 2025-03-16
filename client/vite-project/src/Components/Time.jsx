import React from 'react'

function Time() {
  return (

    <div className='time'>
        {new Date().toLocaleTimeString().seconds}
    </div>
  )
}

export default Time