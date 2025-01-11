import React, {useEffect, useState} from "react";
import {Body, Info, Warning} from "./Exports.tsx";

interface TeamListProps {
    loading: boolean;
    currentTeam: { players: { id: number; name: string; position: string }[] } | null;
}

const TeamDetails: React.FC<TeamListProps> = ({ loading, currentTeam }) => {
    const [playerCount, setPlayerCount] = useState(0);

    useEffect(() => {
        if (currentTeam) {
            setPlayerCount(currentTeam.players.length);
        }
    }, [currentTeam]);

    return (
        <div>
            {loading ? (
                <p>Loading team data...</p>
            ) : currentTeam ? (
                <>
                    <p>Number of players: {playerCount}</p>
                    {currentTeam.players.length < 11 ? <Warning/> : <Info/>}
                    <Body players={currentTeam.players}/>
                </>
            ) : (
                <p>I can't find the players from the team you've asked</p>
            )}
        </div>
    );
}

export default TeamDetails;