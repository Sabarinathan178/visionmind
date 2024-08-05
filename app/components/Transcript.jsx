'use client'
import React from 'react';

const Transcript = ({ transcript }) => {
  
  const concat = transcript.join('\n');
  return (
    <div>
      <h2>Transcript</h2>
      <ul>
        {transcript.map((entry, index) => (
          <li key={index}>
            <strong>{entry.start}</strong> - {entry.subtitle}
            <p>{entry.subtitle} </p> 
          </li>
        ))}
      </ul>
       {/* <textarea rows={10} cols={100} value={concat} readOnly className='text bg-gray-700' /> */}
    </div>
  );
};

export default Transcript;


