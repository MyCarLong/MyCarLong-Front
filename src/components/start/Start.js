import React, { useState, useEffect } from 'react';

function Start() {
  const [opacity, setOpacity] = useState(1); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
    }, 500);

    return () => clearTimeout(timer);
  }, []); 

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        opacity: opacity, 
        transition: 'opacity 2s ease-in-out', 
      }}
    >
        
      <img src={`${process.env.PUBLIC_URL}/images/mycarlong_original.png`} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />

    </div>
  );
}
//fixed public image path {/*<img src="./images/mycarlong_original.png" alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />*/}

export default Start;
