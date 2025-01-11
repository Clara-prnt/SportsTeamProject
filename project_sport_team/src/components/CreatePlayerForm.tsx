import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CreatePlayerFormProps {
    onPlayerAdded: () => void;
}

interface Team {
    id: string;
    name: string;
    players: { name: string; position: string }[];
}

export const CreatePlayerForm: React.FC<CreatePlayerFormProps> = ({ onPlayerAdded }) => {
    const [playerCount, setPlayerCount] = useState(0);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [teamId, setTeamId] = useState<string>('');
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Fetch the list of teams
    useEffect(() => {
        axios.get('http://localhost:3001/teams')
            .then(response => setTeams(response.data))
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    // Update the total player count
    useEffect(() => {
        const totalPlayers = teams.reduce((count, team) => count + team.players.length, 0);
        setPlayerCount(totalPlayers);
    }, [teams]);

    // When the form is submitted, send a POST request to the server
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !position || !teamId) {
            setError('Name, position, and team are required.');
            return;
        }

        try {
            // Find the selected team and add the player to it
            const team = teams.find(t => t.id === teamId);
            if (team) {
                team.players.push({ name, position });
                await axios.put(`http://localhost:3001/teams/${teamId}`, team);
                setName('');
                setPosition('');
                setTeamId('');
                setError(null);
                setSuccess('Player successfully added!');
                onPlayerAdded(); // Notify parent component to refresh the player list
            } else {
                setError('Selected team not found.');
                setSuccess(null);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(`Failed to add the player: ${error.response.status} - ${error.response.data}`);
            } else {
                setError('Failed to add the player.');
            }
            setSuccess(null);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Add Player</h2>
                {/* Display an error or success message if needed */}
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Position:
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Team:
                        <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                            <option value="">Select a team</option>
                            {teams.map(team => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <p>Number of players in all teams: {playerCount}</p>
                <button type="submit">Add Player</button>
            </form>
        </>
    );
};