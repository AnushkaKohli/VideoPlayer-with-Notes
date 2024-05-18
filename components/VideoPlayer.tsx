import React from 'react';

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
        </div>
    );
};

export default VideoPlayer;
