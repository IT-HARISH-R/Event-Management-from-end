import React, { useState } from 'react';
import api from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddSessionForm = () => {
    const params = useParams();
    const eventId = params.id;
    const navigater = useNavigate()

    const [session, setSession] = useState({
        sessionTitle: '',
        description: '',
        startTime: '',
        endTime: '',
        speakers: [],
        location: '',
    });

    const [newSpeaker, setNewSpeaker] = useState({ name: '', bio: '' });

    const addSpeaker = () => {
        if (newSpeaker.name && newSpeaker.bio) {
            setSession((prevSession) => ({
                ...prevSession,
                speakers: [...prevSession.speakers, newSpeaker],
            }));
            setNewSpeaker({ name: '', bio: '' });
        } else {
            alert('Please provide both name and bio for the speaker.');
        }
    };

    const removeSpeaker = (index) => {
        setSession((prevSession) => ({
            ...prevSession,
            speakers: prevSession.speakers.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/schedule', { ...session, eventId });
            alert('Session created successfully');
            navigater("/")
            const startTime = session.startTime
            const endTime = session.endTime
            await api.post('/notify', { eventId, startTime, endTime })


        } catch (err) {
            console.error('Error adding session:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-2 mt-20">
            <input
                type="text"
                placeholder="Session Title"
                value={session.sessionTitle}
                onChange={(e) => setSession({ ...session, sessionTitle: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
            />
            <textarea
                placeholder="Description"
                value={session.description}
                onChange={(e) => setSession({ ...session, description: e.target.value })}
                className="border p-2 mb-2 w-full"
            />
            <input
                type="datetime-local"
                value={session.startTime}
                onChange={(e) => setSession({ ...session, startTime: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
            />
            <input
                type="datetime-local"
                value={session.endTime}
                onChange={(e) => setSession({ ...session, endTime: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
            />

            <div className="border p-4 mb-2 rounded">
                <h4 className="text-lg font-bold mb-2">Speakers</h4>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        placeholder="Speaker Name"
                        value={newSpeaker.name}
                        onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
                        className="border p-2 w-1/2"
                    />
                    <input
                        type="text"
                        placeholder="Speaker Bio"
                        value={newSpeaker.bio}
                        onChange={(e) => setNewSpeaker({ ...newSpeaker, bio: e.target.value })}
                        className="border p-2 w-1/2"
                    />
                    <button
                        type="button"
                        onClick={addSpeaker}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add Speaker
                    </button>
                </div>
                {session.speakers.length > 0 && (
                    <ul className="list-disc pl-5">
                        {session.speakers.map((speaker, index) => (
                            <li key={index} className="mb-1 flex justify-between items-center">
                                <span>
                                    <strong>{speaker.name}</strong>: {speaker.bio}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeSpeaker(index)}
                                    className="text-red-500 hover:underline ml-2"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <input
                type="text"
                placeholder="Location"
                value={session.location}
                onChange={(e) => setSession({ ...session, location: e.target.value })}
                className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Session
            </button>
        </form>
    );
};

export default AddSessionForm;
