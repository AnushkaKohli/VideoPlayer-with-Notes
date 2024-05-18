"use client";

import React from 'react';
import Image from 'next/image';
import Button from './Button';

interface SingleNote {
    timestamp: number;
    createdAt: Date;
    content: string;
    image?: string;
    handleDelete: () => void;
    handleEdit: () => void;
}

const SingleNote: React.FC<SingleNote> = ({ timestamp, createdAt, content, image, handleDelete, handleEdit }) => {

    function formatDate (date: Date) {
        const day = new Date().getDate().toString().padStart(2, '0');
        const month = new Date().toLocaleString('en-US', { month: 'short' }); // 'May'
        const year = new Date().getFullYear().toString().slice(-2); // Extract last two digits

        return `${day} ${month} ’${year}`;
    }


    const handleClick = () => {
        // Seek video to the timestamp
    };

    return (
        <div className="note text-gray-600">
            <p className='font-medium'>{formatDate(createdAt)}</p>
            <div className='flex gap-1' onClick={handleClick}>
                Timestamp:
                <p className='text-violet-700'>
                    01 min 30 sec
                </p>
            </div>
            {image && <Image src={image} alt="Note attachment" width={200} height={200} />}
            <p className='border border-gray-200 rounded-md my-4 p-2'>{content}</p>
            <div className='flex justify-end'>
                <Button onClick={handleDelete} text='Delete note' />
                <Button onClick={handleEdit} text='Edit note' />
            </div>
            <hr className="h-[0.5px] my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
    );
};

export default SingleNote;
