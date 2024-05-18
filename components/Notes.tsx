import React from 'react';
import { MdAddCircleOutline } from "react-icons/md";
import SingleNote from './SingleNote';

interface Notes {
    notes: SingleNote[];
}

const Notes: React.FC<Notes> = ({ notes }) => {

    return (
        <div className="note">
            <div className='top-bar flex justify-between gap-2'>
                <div className='note-heading'>
                    <h1 className='font-semibold'>My notes</h1>
                    <p className='text-gray-400 text-sm'>All your notes at a single place. Click on any note to specific timestamp in the video.</p>
                </div>
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 md:px-4 py-2.5 me-2 mb-2 flex items-center gap-x-2">
                    <MdAddCircleOutline className='text-xl hidden xl:block' />
                    Add new note
                </button>
            </div>
            <hr className="h-[0.5px] my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            {
                notes.map((note, index) => (
                    <SingleNote
                        key={index}
                        createdAt={note.createdAt}
                        timestamp={note.timestamp}
                        content={note.content}
                        image={note.image}
                    />
                ))
            }
        </div>
    );
};

export default Notes;
