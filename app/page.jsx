'use client'

import { useState } from 'react'
import Home from './components/Home'
import VideoPlayer from './components/videoPlayer'

const HomePage = () => {

    const[topic,setTopic] = useState('')

    return (
        <div className='min-h-screen place-content-center flex'>
            {
                <div>
                         <div className="player">
                           <VideoPlayer getTopic={setTopic} className='video-player w-60 p-50'/>
                        </div>
                        <div className="sideBar">
                            {topic!=''&&(<Home topic={topic} className='quiz w-20 p-50'/>)}
                        </div>
                    </div>     
            }
            
        </div>
    )
}
export default HomePage

