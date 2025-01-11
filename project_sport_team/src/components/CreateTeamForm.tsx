import React, { useState } from 'react';
import axios from 'axios';

interface CreateTeamFormProps {
    onTeamAdded: () => void;
}

export const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onTeamAdded }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) {
            setError('Team name is required.');
            return;
        }

        try {
            await axios.post('http://localhost:3001/teams', { name, players: [] });
            setName('');
            setError(null);
            setSuccess('Team successfully added!');
            onTeamAdded(); // Notify parent component to refresh the team list
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(`Failed to create the team: ${error.response.status} - ${error.response.data}`);
            } else {
                setError('Failed to create the team.');
            }
            setSuccess(null);
            console.error('Error creating team:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Create Team</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <div>
                    <label>
                        Team Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Create Team</button>
            </form>
        </>
    );
};