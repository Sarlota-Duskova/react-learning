import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function TeamPage(props){
  //const { teamId } = useParams();
  const {state} = useLocation();
  const { teams, players, teamId } = state;

  // Find the specific team based on teamId
  const team = teams.find(team => team.id === teamId);
  console.log(teamId)
  const teamPlayers = players.filter(player => team.subelement.includes(player.name));

  return (
    <div>
      <h1>{team.name}</h1>
      {teamPlayers.length > 0 ? (
        <div>
          <h2>{teamPlayers.length === 1 ? 'Player' : 'Players'}:</h2>
          <ul>
            {teamPlayers.map(player => (
              <li key={player.id}>
                <div>{player.name}</div>
                <img src={player.image} alt={player.name} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>This team does not have assigned players yet.</p>
    )}
    </div>
  )
}