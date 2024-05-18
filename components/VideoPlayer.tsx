"use client";

import React, { useState } from 'react';
import YouTube from 'react-youtube';
import VideoTitle from './VideoTitle';
import Notes from './Notes';

interface VideoPlayerProps {
    videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
    const [player, setPlayer] = useState<YouTube | null>(null);
    const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);

    const opts = {
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="video-player">
            <YouTube
                videoId={videoId}
                onReady={(event) => {
                    setPlayer(event.target)
                    setCurrentTimestamp(event.target.getCurrentTime())
                }}
                opts={opts}
                iframeClassName='rounded-md w-full h-[70vh]' />
            <VideoTitle title="Video title goes here" description="This is the description of the video" />
            <div className="border border-gray-200 rounded-xl p-6">
                <Notes videoId={videoId} currentTimestamp={currentTimestamp} />
            </div>
        </div>
    );
};

export default VideoPlayer;
