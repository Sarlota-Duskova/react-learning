import React from 'react';
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
    <div id="team--container">
      <h1 id="team--heading">{team.name}</h1>
      {teamPlayers.length > 0 ? (
        <div>
          <h2 id="team--playersTitle">{teamPlayers.length === 1 ? 'Player' : 'Players'}:</h2>
          
          <div id="team--cardContainer">
            {teamPlayers.map(player => (
              <div id="team--card">
                <div id="team--playerName" key={player.id}>{player.name}</div>
                <img id="team--image" src={player.image} alt={player.name} />
              </div>
            ))}
          </div>

        </div>
      ) : (
        <p id="team--noPlayers">This team does not have assigned players yet.</p>
    )}
    </div>
  )
}