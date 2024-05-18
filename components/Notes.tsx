"use client";

import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import SingleNote from './SingleNote';

interface NotesProps {
    timestamp: string;
}

interface Note {
    id: string;
    timestamp: number;
    createdAt: Date;
    content: string;
    image?: string;
}

const Notes: React.FC<NotesProps> = ({ timestamp }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [toggleInitialData, setToggleInitialData] = useState<boolean>(false);
    const [isNewNote, setIsNewNote] = useState<boolean>(false);
    const [noteContent, setNoteContent] = useState<string>('');
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            if (localStorage.getItem("appData") === null) {
                localStorage.setItem(
                    "appData",
                    JSON.stringify({
                        notes: [
                            {
                                id: uuidv4(),
                                timestamp: new Date().getTime(),
                                createdAt: new Date(),
                                content: "This is my first note.",
                            },
                        ],
                    })
                );
            }
            setNotes(JSON.parse(localStorage.getItem("appData") ?? '').notes);
        }
    }, [toggleInitialData]);

    useEffect(() => {
        let appData = JSON.parse(localStorage.getItem("appData") ?? '');
        let updatedData = (appData = { ...appData, notes: notes });
        localStorage.setItem("appData", JSON.stringify(updatedData));
    }, [notes]);

    const handleDelete = (idToDelete: string) => {
        const updatedNotes = notes.filter((note: Note) => note.id !== idToDelete);
        setNotes(updatedNotes);
        let appData = JSON.parse(localStorage.getItem("appData") ?? '');
        appData.notes = appData.notes.filter((note: Note) => note.id !== idToDelete);
        localStorage.setItem("appData", JSON.stringify(appData));
        setToggleInitialData(prevState => !prevState);
    }

    const handleEdit = (idToEdit: string) => {
        // Edit note
        setEditingNoteId(idToEdit);
    }

    const handleAddNote = () => {
        setIsNewNote(true);
    }

    const handleSave = () => {
        const newNote = {
            id: uuidv4(),
            timestamp: new Date().getTime(),
            createdAt: new Date(),
            content: noteContent,
        };
        setNotes([...notes, newNote]);
        setIsNewNote(false);
    }

    return (
        <div className="note">
            <div className='top-bar flex justify-between gap-2'>
                <div className='note-heading'>
                    <h1 className='font-semibold'>My notes</h1>
                    <p className='text-gray-400 text-sm'>All your notes at a single place. Click on any note to specific timestamp in the video.</p>
                </div>
                <button type="button" onClick={handleAddNote} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 md:px-4 py-2.5 me-2 mb-2 flex items-center gap-x-2">
                    <MdAddCircleOutline className='text-xl hidden xl:block' />
                    Add new note
                </button>
            </div>
            {
                isNewNote && (
                    <div className='note-form my-3'>
                        <form>
                            <input type='text' onChange={(e) => setNoteContent(e.target.value)} className='border border-gray-200 rounded-md w-full p-2' placeholder='Enter your note here'></input>
                            <div className='flex gap-2 justify-between pt-2'>
                                <input type='file' className='mt-2' />
                                <button onClick={handleSave} type='submit' className='bg-violet-600 text-white rounded-md p-2 mt-2'>Save note</button>
                            </div>
                        </form>
                    </div>
                )
            }
            <hr className="h-[0.5px] my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            {
                notes.map((note, index) => (
                    <div key={index}>
                        <SingleNote
                            createdAt={note.createdAt}
                            timestamp={note.timestamp}
                            content={note.content}
                            image={note.image}
                            handleDelete={() => handleDelete(note.id)}
                            handleEdit={() => handleEdit(note.id)}
                        />
                        {
                            editingNoteId && editingNoteId === note.id ? (
                                <div className='note-form my-3'>
                                    <form>
                                        <input
                                            type='text'
                                            value={noteContent}
                                            onChange={(e) => setNoteContent(e.target.value)}
                                            className='border border-gray-200 rounded-md w-full p-2'
                                            placeholder='Edit your note here'
                                        ></input>
                                        <div className='flex gap-2 justify-between pt-2'>
                                            <input type='file' className='mt-2' />
                                            <button
                                                onClick={() => {
                                                    // Save the edited note
                                                    const updatedNote = {
                                                        ...notes.find(note => note.id === editingNoteId),
                                                        content: noteContent,
                                                    };
                                                    setNotes(notes.map(note => note.id === editingNoteId ? updatedNote : note) as Note[]);
                                                    setEditingNoteId(null); // Reset editing mode
                                                }}
                                                type='submit'
                                                className='bg-violet-600 text-white rounded-md p-2 mt-2'
                                            >
                                                Save changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : null
                        }

                    </div>
                ))
            }

        </div>
    );
};

export default Notes;
