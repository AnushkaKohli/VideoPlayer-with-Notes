"use client";

import React from 'react';
import Button from './Button';

interface SingleNote {
    timestamp: number;
    createdAt: Date;
    content: string;
    image?: string;
}

const SingleNote: React.FC<SingleNote> = ({ timestamp, createdAt, content, image }) => {

    function formatDate (date: Date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' }); // 'May'
        const year = date.getFullYear().toString().slice(-2); // Extract last two digits

        return `${day} ${month} ’${year}`;
    }


    const handleClick = () => {
        // Seek video to the timestamp
    };

    return (
        <div className="note text-gray-600">
            <p className='font-medium'>{formatDate(createdAt)}</p>
            <p className='flex gap-1' onClick={handleClick}>
                Timestamp:
                <p className='text-violet-700'>
                    01 min 30 sec
                </p>
            </p>
            {image && <img src={image} alt="Note attachment" />}
            <p className='border border-gray-200 rounded-md my-4 p-2'>{content}</p>
            <div className='flex justify-end'>
                <Button text='Delete note' />
                <Button text='Edit note' />
            </div>
            <hr className="h-[0.5px] my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
    );
};

export default SingleNote;
