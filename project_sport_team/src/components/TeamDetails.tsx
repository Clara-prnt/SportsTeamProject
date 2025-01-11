import React, {useEffect, useState} from "react";
import {Body, Info, Warning} from "./Exports.tsx";

interface TeamListProps {
    currentTeam: { players: { id: number; name: string; position: string }[] } | null;
}

const TeamDetails: React.FC<TeamListProps> = ({ currentTeam }) => {
    const [playerCount, setPlayerCount] = useState(0);

    // Update the player count when the current team changes
    useEffect(() => {
        if (currentTeam) {
            setPlayerCount(currentTeam.players.length);
        }
    }, [currentTeam]);

    return (
        <div>
            { currentTeam ? (
                <>
                    {/* Display a different message if there is (or isn't) players */}
                    <p>Number of players: {playerCount}</p>
                    {currentTeam.players.length < 11 ? <Warning/> : <Info/>}
                    {/* Display the team players (if some exist) */}
                    <Body players={currentTeam.players}/>
                </>
            ) : (
                <>
                    {/* Display a message if the team is not found */}
                    <p>I can't find the players from the team you've asked</p>
                </>

            )}
        </div>
    );
}

export default TeamDetails;