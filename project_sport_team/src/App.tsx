import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Menu, Footer } from "./components/Exports";
import TeamDetails from "./components/TeamDetails.tsx";
import {CreateTeamForm} from "./components/CreateTeamForm.tsx";
import {CreatePlayerForm} from "./components/CreatePlayerForm.tsx";
import axios from "axios";

interface Player {
    id: number;
    name: string;
    position: string;
}

interface Team {
    id: number;
    name: string;
    players: Player[];
}

const App: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

    // Fetch all teams on initial load
    useEffect(() => {
        axios
            .get("http://localhost:3001/teams")
            .then((response) => {
                setTeams(response.data);
            })
            .catch((error) => console.error("Error fetching teams:", error));
    }, []);

    return (
        <Router>
            {/* Allows having the Menu in every route */}
            <Menu teamName={currentTeam ? currentTeam.name : "Sports Teams"} />
            <div className="main">
                <Routes>
                    {/* Main route displaying the list of teams */}
                    <Route
                        path="/"
                        element={
                            <div>
                                <h2>Team List</h2>
                                {teams.map((team) => (
                                    <div key={team.id}>
                                        <Link to={`/teams/${team.id}`}
                                              onClick={() => setCurrentTeam(team)}>
                                            {team.name}</Link>
                                    </div>
                                ))}
                            </div>
                        }
                    />

                    {/* Route for viewing the players of a specific team */}
                    <Route
                        path="/teams/:id"
                        element={<TeamDetails currentTeam={currentTeam} />}
                    />

                    {/* Route for creating a team */}
                    <Route path="/create-team" element={<CreateTeamForm
                        onTeamAdded={() =>
                            axios.get("http://localhost:3001/teams").then((response) => setTeams(response.data))
                        } />}
                    />

                    {/* Route for creating a player */}
                    <Route path="/create-player" element={<CreatePlayerForm onPlayerAdded={() => {
                            if (currentTeam) {
                                axios.get(`http://localhost:3001/teams/${currentTeam.id}`)
                                    .then((response) => setCurrentTeam(response.data))
                                    .catch((error) => console.error('Error fetching team:', error));
                            }
                        }} />}
                    />
                </Routes>
            </div>
            {/* Allows having the Footer in every route */}
            <Footer/>
        </Router>
    );
};

export default App;
