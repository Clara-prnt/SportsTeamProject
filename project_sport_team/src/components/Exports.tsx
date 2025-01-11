import React from "react";
import Player from "./Player";

interface MenuProps {
    teamName: string; // The name of the current team to display
}

/* --------- Teams reactions --------- */
export const Warning: React.FC = () => <p className="warning">Warning: Fewer than 11 players!</p>;
export const Info: React.FC = () => <p className="info">Team is ready with 11 or more players.</p>;

/* --------- HTML parts --------- */
export const Body: React.FC<{ players: { id: number; name: string; position: string }[] }> = ({ players }) => (
    <>
        {players.map(player => (
            <Player key={player.id} name={player.name} position={player.position} />
        ))}
    </>

);
export const Menu: React.FC<MenuProps> = ({ teamName }) => {
    return (
        <div className="menu-links">
            <p>{teamName}</p>
            <a href="/">Home</a>
            <a href="/create-team">Add a Team</a>
            <a href="/create-player">Add a Player to the Team</a>
        </div>
    );
};

/*export const Main: React.FC<MainProps> = ({ players }) => (
    <div className="main">
        <h1>Welcome to the Sports App!</h1>
        {players.length < 11 ? (
            <Warning/>
        ) : (
            <Info/>
        )}
        {players.map((player) => (
            <div key={player.id}>{player.name}</div>
        ))}
    </div>
);*/
export const Footer: React.FC = () => <footer>© 2025 Sports Typescript Webpage Clara PERNET</footer>;