import React from 'react';
import VideoTitle from './VideoTitle';
import Notes from './Notes';

interface VideoPlayerProps {
    videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-player">
            <iframe
                // width="853"
                // height="480"
                src={youtubeUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube video"
                className='rounded-md w-full h-[70vh]'
            />

            <VideoTitle title="Video title goes here" description="This is the description of the video" />
            <div className="border border-gray-200 rounded-xl p-6">
                <Notes timestamp="01 min 30 sec" />
            </div>
        </div>
    );
};

export default VideoPlayer;
