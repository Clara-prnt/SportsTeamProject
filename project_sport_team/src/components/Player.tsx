import React from "react";

const Player: React.FC<{ name: string; position: string }> = ({ name, position }) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: "1rem", margin: "0.5rem 0" }}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Position:</strong> {position}</p>
        </div>
    );
};

export default Player;
