"use client";

import React, { useState } from 'react';
import { MdAddCircleOutline } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import SingleNote from './SingleNote';
import AddNoteModal from './AddNoteModal';

interface Note {
    id: string;
    timestamp: number;
    createdAt: string;
    content: string;
    image?: string;
}

interface NotesProps {
    videoId: string;
    currentTimestamp: number;
}

const Notes: React.FC<NotesProps> = ({ videoId, currentTimestamp }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState('');
    const [noteImage, setNoteImage] = useState<File | null>(null);
    const [open, setOpen] = useState(false);

    function formatDate (date: Date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' }); // 'May'
        const year = date.getFullYear().toString().slice(-2); // Extract last two digits

        return `${day} ${month} ’${year}`;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }

    // const handleImageAdd = (file: File | null) => {
    //     if (!file) return;
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         note.image = reader.result as string;
    //         setNotes([...notes, note]);
    //         localStorage.setItem('notes', JSON.stringify([...notes, note]));
    //     };
    //     setNoteImage(files[0]);
    // }

    const addNote = () => {
        if (newNote.trim() === '') return;
        const timestamp = currentTimestamp;
        const createdAt = formatDate(new Date());
        const note: Note = {
            id: uuidv4(),
            timestamp,
            createdAt,
            content: newNote,
        };

        if (noteImage) {
            const reader = new FileReader();
            reader.onload = () => {
                note.image = reader.result as string;
                setNotes([...notes, note]);
                localStorage.setItem('notes', JSON.stringify([...notes, note]));
            };
            reader.readAsDataURL(noteImage);
        } else {
            setNotes([...notes, note]);
            localStorage.setItem('notes', JSON.stringify([...notes, note]));
        }

        setNewNote('');
        setNoteImage(null);
        handleClose();
    };

    const editNote = (id: string, newContent: string) => {
        setNotes(notes.map((note) => (note.id === id ? { ...note, content: newContent } : note)));
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id));
        localStorage.setItem('notes', JSON.stringify(notes));
    };
    return (
        <div className="note">
            <div className='top-bar flex justify-between gap-2'>
                <div className='note-heading'>
                    <h1 className='font-semibold'>My notes</h1>
                    <p className='text-gray-400 text-sm'>All your notes at a single place. Click on any note to specific timestamp in the video.</p>
                </div>
                <button type="button" onClick={handleOpen} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 md:px-4 py-2.5 me-2 mb-2 flex items-center gap-x-2">
                    <MdAddCircleOutline className='text-xl hidden xl:block' />
                    Add new note
                </button>
                <AddNoteModal isOpen={open} onClose={handleClose}>
                    <>
                        <h1 className='font-semibold'>Add new note</h1>
                        <input
                            type='text'
                            className='border border-gray-200 rounded-md my-4 p-2 w-full'
                            placeholder='Type your note here'
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                        />
                        {/* <input
                        type='file'
                        className='border border-gray-200 rounded-md my-4 p-2 w-full'
                        onChange={(e) => handleImageAdd(e.target.files[0])}
                    /> */}
                        <button
                            type='button'
                            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 flex items-center gap-x-2'
                            onClick={addNote}
                        >
                            Add note
                        </button>
                    </>
                </AddNoteModal>
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
