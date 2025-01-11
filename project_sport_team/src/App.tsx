import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, Link, useParams} from "react-router-dom";
import { Menu, Footer } from "./components/Exports";
import axios from "axios";
import TeamDetails from "./components/TeamDetails.tsx";
import {CreateTeamForm} from "./components/CreateTeamForm.tsx";
import {CreatePlayerForm} from "./components/CreatePlayerForm.tsx";

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
    const [loading, setLoading] = useState(false); // Loading state to handle API fetch

    // Fetch all teams on initial load
    useEffect(() => {
        axios
            .get("http://localhost:3001/teams")
            .then((response) => {
                setTeams(response.data);
            })
            .catch((error) => console.error("Error fetching teams:", error));
    }, []);

    // Load the current team based on the route
    const {id} = useParams<{ id: string }>();
    useEffect(() => {
        if (id) {
            setLoading(true);
            setCurrentTeam(null);
            axios
                .get(`http://localhost:3001/teams/${id}`)
                .then((response) => {
                    setCurrentTeam(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching the current team:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    return (
        <Router>
            <Menu teamName={currentTeam ? currentTeam.name : "Sports Teams"} />
            <div style={{ paddingTop: "4rem", paddingBottom: "2rem" }}>
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

                    {/* Route for viewing a specific team */}
                    <Route
                        path="/teams/:id"
                        element={<TeamDetails loading={loading} currentTeam={currentTeam} />}
                    />
                    <Route path="/create-team" element={<CreateTeamForm
                        onTeamAdded={() =>
                            axios.get("http://localhost:3001/teams").then((response) => setTeams(response.data))
                        }
                    />} />
                    <Route path="/create-player" element={<CreatePlayerForm onPlayerAdded={() => {
                            if (currentTeam) {
                                axios.get(`http://localhost:3001/teams/${currentTeam.id}`)
                                    .then((response) => setCurrentTeam(response.data))
                                    .catch((error) => console.error('Error fetching team:', error));
                            }
                        }}
                    />} />
                </Routes>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;
