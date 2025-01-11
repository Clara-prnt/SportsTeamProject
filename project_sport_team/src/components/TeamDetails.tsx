import React from "react";
import {Body, Info, Warning} from "./Exports.tsx";

interface TeamListProps {
    loading: boolean;
    currentTeam: { players: { id: number; name: string; position: string }[] } | null;
}

const TeamList: React.FC<TeamListProps> = ({ loading, currentTeam }) => {
    return (
        <div>
            {loading ? (
                <p>Loading team data...</p>
            ) : currentTeam ? (
                <>
                    {currentTeam.players.length < 11 ? <Warning/> : <Info/>}
                    <Body players={currentTeam.players}/>
                </>
            ) : (
                <p>I can't find the players from the team you've asked</p>
            )}
        </div>
    );
}

export default TeamList;