'use client'

import React, { useState ,useEffect} from 'react'
import Iframe  from 'react-iframe';
import axios from 'axios';
import Transcript from './Transcript';

const VideoPlayer = (props) => {

    const {getTopic}= props;
    const [topic, setTopic] = useState('');
    const [type,setType]=useState('')
    const [mostViewedVideo, setMostViewedVideo] = useState('');
    const [subtitle, setSub] = useState(null);

    //video fetch
    const fetchVideos = () => {  
      axios.get(`/api/youtube/most-viewed?topic=${type} ${topic}`)
        .then(response => {
          setMostViewedVideo(response.data.videoLink);
        })
        .catch(error => {
          console.error('Error fetching most viewed video:', error);
        });
    };

    //fetch sub
    const fetchSubtitle = async () =>{
      const options = {
        method: 'GET',
        url: 'https://youtube-transcriptor.p.rapidapi.com/transcript',
        params: {
          video_id: mostViewedVideo,
          lang: ['en','en-IN']
        },
        headers: {
          'X-RapidAPI-Key': 'aa645a7461msh949152d48a946b8p1c1c89jsnf5b09cd4b9e7'||process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        setSub(response.data[0].transcription);
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <div className="video flex flex-col">
        <div className="search-bar-container flex items-center bg-gray-800 p-4 rounded">
        <input
          className='q-button'
          type="text"
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => {setTopic(e.target.value);getTopic(e.target.value)}}
        />
        <select
          name='type'
          value={type}
          onChange={(e) => setType(e.target.value)}
          className='q-button'
        >
          <option value='tutorial'>Theory</option>
          <option value='course'>Practical</option>
          <option value='project'>project</option>
        </select>
        <button onClick={fetchVideos} className='q-button'>Search</button>
        </div>
        <div className="search-bar-container flex items-center bg-gray-800 p-4 rounded">
          {mostViewedVideo&& (
          <div className="frame flex flex-col items-center">
            <Iframe
              url={`https://www.youtube.com/embed/${mostViewedVideo}`}
              width="800px"
              height="450px"
              frameborder="0"
              allowfullscreen
            />
            <button className='q-button' onClick={fetchSubtitle}>Transcribe</button>
            {(subtitle!=null)&&(
              <div className="subtitle text-white bg-gray-600 p-4 m-5 rounded overflow-y-scroll border max-h-96">
                <Transcript transcript={subtitle} className='sub'/>
              </div>)
            }  
        </div>
      )}
      {!mostViewedVideo && <p>Surf through</p>}
        </div>
        
      </div>
    );    
}

export default VideoPlayer