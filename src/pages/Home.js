/* ------------ Important ------------ */
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';


/* ------------ Components ----------- */
import TeamPlayerInput from '../components/TeamPlayerInput';
import AddPlayerToTeamButtons from '../components/AddPlayerToTeamButtons';
import DataRender from '../components/DataRender';

/* -------------- Data --------------- */
//import dataPlayers from '../data/dataPlayers';
//import dataTeams from '../data/dataTeams';

/* -------------- Pages -------------- */
//import TeamPage from './pages/TeamPage';

export default function Home() {
    


    //const [teams, setTeams] = useState([
    const defaultTeams = [
        { 
          id: 0,
          name: "Slavie Praha",
          subelement: ["Player 3"]
        },
        { 
          id: 1,
          name: "Votroci",
          subelement: ["Player 1", "Player 2"]
        },
        { 
          id: 2,
          name: "Sparta",
          subelement: []
        }
      ];
  
      //const [players, setPlayers] = useState([
    const defaultPlayers = [
        { 
          id: 0,
          name: "Player 1",
          subelement: "Votroci",
          image: "https://cdn-icons-png.flaticon.com/512/146/146031.png"
        },
        { 
          id: 1,
          name: "Player 2",
          subelement: "Votroci",
          image: "https://cdn-icons-png.flaticon.com/512/146/146031.png"
        },
        { 
          id: 2,
          name: "Player 3",
          subelement: "Slavie Praha",
          image: "https://cdn-icons-png.flaticon.com/512/146/146031.png"
        },
        { 
          id: 3,
          name: "Player 4",
          subelement: "Unassigned",
          image: "https://cdn-icons-png.flaticon.com/512/146/146031.png"
        },
        { 
          id: 4,
          name: "Player 5",
          subelement: "Unassigned",
          image: "https://cdn-icons-png.flaticon.com/512/146/146031.png"
        }
      ];
    // Load teams and players data from localStorage, or use default values if not available
    const [teams, setTeams] = useState(() => {
        const storedTeams = localStorage.getItem('teams');
        return storedTeams ? JSON.parse(storedTeams) : defaultTeams;
    });

    const [players, setPlayers] = useState(() => {
        const storedPlayers = localStorage.getItem('players');
        return storedPlayers ? JSON.parse(storedPlayers) : defaultPlayers;
    });

    useEffect(() => {
        // Save teams and players data to localStorage whenever they change
        localStorage.setItem('teams', JSON.stringify(teams));
        localStorage.setItem('players', JSON.stringify(players));
    }, [teams, players]);
  
    const [newTeamName, setNewTeamName] = useState('');
    const [newPlayerName, setNewPlayerName] = useState('');
  
    const handleAddTeam = () => {
      if (newTeamName.trim() !== '') {
        const newTeam = { id: teams.length, name: newTeamName, subelement: []};

        setTeams([...teams, newTeam]);
        setActiveTeams([...activeTeams, false]);
        setNewTeamName('');
      }
    };
  
    const handleAddPlayer = () => {
      if (newPlayerName.trim() !== '') {
        // Find the maximum ID currently in use
        const maxId = players.reduce((max, player) => (player.id > max ? player.id : max), 0);
        // Generate a new unique ID by incrementing the maximum ID
        const newId = maxId + 1;
        const newPlayer = { id: newId, name: newPlayerName, subelement: "Unassigned", image:"https://cdn-icons-png.flaticon.com/512/146/146031.png" };

        setPlayers([...players, newPlayer]);
        setActivePlayers([...activePlayers, false]);
        setNewPlayerName('');
      }
    };

    const [selectedTeam, setSelectedTeam] = useState(null); //null
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [teamError, setTeamError] = useState(false);
    const [playerError, setPlayerError] = useState(false);

    const handleTeamClick = (team) => {
        /*
        setSelectedTeam(team);
        console.log("Selected Team:", team.title);
        setTeamError(false);
        */
        if (team === selectedTeam) {
        setSelectedTeam(null);
        
        } else {
        setSelectedTeam(team);
        console.log("Selected Team:", team.name);
        setTeamError(false);
        }
    };

    const handlePlayerClick = (player) => {
        // Check if the player is already selected
        const isSelectedIndex = selectedPlayers.findIndex(selectedPlayer => {
        console.log("Checking selected player:", selectedPlayer.id);
        console.log("Clicked player ID:", player.id);
        return selectedPlayer.id === player.id;
        });
    
        console.log("isSelectedIndex:", isSelectedIndex);
        
        if (isSelectedIndex !== -1) {
        // If the player is already selected, remove it from the selectedPlayers array
        const updatedSelectedPlayers = [...selectedPlayers];
        updatedSelectedPlayers.splice(isSelectedIndex, 1);
        setSelectedPlayers(updatedSelectedPlayers);
        console.log("Deselected Player:", player);
        console.log("Updated Selected Players:", updatedSelectedPlayers);
        } else {
        // If the player is not selected, add it to the selectedPlayers array
        setSelectedPlayers([...selectedPlayers, player]);
        console.log("Selected Players:", [...selectedPlayers, player]);
        }
        setPlayerError(false);
    };

    const [activeTeams, setActiveTeams] = useState(Array(teams.length).fill(false)); // Initialize activeTeams state
    const [activePlayers, setActivePlayers] = useState(Array(players.length).fill(false)); // Initialize activeTeams state

    const handleAddPlayerToTeam = () => {
        if (!selectedTeam) {
        setTeamError(true);
        return;
        }

        if (selectedPlayers.length === 0) {
        setPlayerError(true);
        return;
        }

        // Update team's players
        //if (selectedTeam && selectedPlayers.length > 0) {
        const updatedTeams = teams.map(team => {
            if (team.id === selectedTeam.id) {
                const newPlayers = selectedPlayers.map(player => player.name);
                console.log(`Adding players ${newPlayers} to team ${team.name}`);
                return {
                ...team,
                subelement: [...team.subelement, ...newPlayers]
                };  
            } else {
                // Remove the selected players from other teams
                return {
                    ...team,
                    subelement: team.subelement.filter(player => !selectedPlayers.map(p => p.name).includes(player))
                };
            }
        });

        setTeams(updatedTeams);

        // Update players' team
        const updatedPlayers = players.map(player => {
            if (selectedPlayers.some(selectedPlayer => selectedPlayer.id === player.id)) {
                return {
                ...player,
                subelement: selectedTeam.name
                };
            }
            return player;
        }); 

        setPlayers(updatedPlayers);

        // Clear selections after adding players to the team
        setSelectedTeam(null);
        setSelectedPlayers([]);
        // Reset active state of teams
        setActiveTeams(Array(teams.length).fill(false));
        setActivePlayers(Array(players.length).fill(false));
        //}
    };

    const handleSave = () => {
        // Create an object containing teams and players data
        const data = {
            teams: teams,
            players: players
        };

        // Convert the data object to a JSON string
        const jsonData = JSON.stringify(data, null, 2);

        // Log the JSON data in the console
        console.log(jsonData);
    };


    const handleDeleteTeam = (teamToDelete) => {
        console.log("Deleting Team with ID:", teamToDelete.id);
        const updatedTeams = teams.filter(team => team.id !== teamToDelete.id);
        setTeams(updatedTeams);

        // Update players who were associated with the deleted team
        const updatedPlayers = players.map (player => {
            if (player.subelement === teamToDelete.name) {
                return {
                    ...player,
                    subelement: "Unassigned"
                };
            }
            return player;
        });
        setPlayers(updatedPlayers);

        console.log("Deleting Team:", teamToDelete);
    };

    const handleDeletePlayer = (playerToDelete) => {
        console.log("Deleting Player with ID:", playerToDelete.id);
        const updatedPlayers = players.filter(player => player.id !== playerToDelete.id);
        setPlayers(updatedPlayers);

        // If the deleted player was assigned to a team, update the list of players for that team
        const updatedTeams = teams.map(team => {
            if (team.subelement.includes(playerToDelete.name)) {
                return {
                    ...team,
                    subelement: team.subelement.filter(playerName => playerName !== playerToDelete.name)
                };
            }
            return team;
        });
        setTeams(updatedTeams);

        console.log("Deleting Player:", playerToDelete);
    };
    /*
    const toggleActivePlayers = (index) => {
        setActivePlayers(prevActivePlayers => {
            const newActivePlayers = [...prevActivePlayers];
            newActivePlayers[index] = !newActivePlayers[index];
            console.log("New Active Players:", newActivePlayers);
            return newActivePlayers;
        });
    };
    
    const toggleActiveTeam = (index) => {
        setActiveTeams(prevActiveTeams => {
            const newActiveTeams = [...prevActiveTeams];
            newActiveTeams[index] = !newActiveTeams[index];
            console.log("New Active Teams:", newActiveTeams);
            return newActiveTeams;
        });
    };
    */

    const toggleActive = (index, isTeam) => {
        if (isTeam) {
            const newActiveTeams = activeTeams.map((isActive, i) => (i === index ? !isActive : false));
            console.log("New Active Teams:", newActiveTeams);
            setActiveTeams(newActiveTeams);
        } else {
            const newActivePlayers = activePlayers.map((isActive, i) => (i === index ? !isActive : isActive));
            console.log("New Active Players:", newActivePlayers);
            setActivePlayers(newActivePlayers);
        }
    };


    const handlePhotoChange = (playerId, imageUrl) => {
        const updatedPlayers = players.map(player => {
            if (player.id === playerId) {
                return { ...player, image: imageUrl };
            }
            return player;
        });
        setPlayers(updatedPlayers);
    };

    const navigate = useNavigate();

    //const history = useHistory();

    const handleShowTeamClick = (teamId) => {
        navigate(`/team/${teamId}`, { state: { teams, players, teamId } });
    };


    const playerElements = players.map((player, index) => (
        <DataRender
            key={player.id}
            name={player.name}
            subelement={player.subelement}
            spanTitle="Team:"
            buttonLists="Photo"
            onDelete={() => handleDeletePlayer(player)}
            onTeamPlayerClick={() => handlePlayerClick(player)}
            //toggleActive={() => toggleActivePlayers(index)}
            toggleActive={() => toggleActive(index, false)}
            active={activePlayers[index]}
            image={player.image}
            onPhotoChange={handlePhotoChange}
        />
    ));

    const teamElements = teams.map((team, index) => (
        <DataRender
            key={team.id}
            name={team.name}
            subelement={team.subelement}
            spanTitle="Players:"
            buttonLists="Show team"
            onDelete={() => handleDeleteTeam(team)}
            onTeamPlayerClick={() => handleTeamClick(team)}
            //toggleActive={() => toggleActiveTeam(index)}
            toggleActive={() => toggleActive(index, true)}
            active={activeTeams[index]}
            onShowTeamClick={() => handleShowTeamClick(index)}
        />
    ));

    return (
        <div className="app">
            <div className="column">
                <TeamPlayerInput
                    columnTitle="Teams"
                    placeholder="Enter team name"
                    buttonText="Add Team"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    onAdd={handleAddTeam}
                />
                
                {teamElements}
                {teamError && <div className="error-message">Please select a team.</div>}
            </div>
            <div className="column">
                <TeamPlayerInput
                    columnTitle="Players"
                    placeholder="Enter player name"
                    buttonText="Add Player"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onAdd={handleAddPlayer}
                />
                {playerElements}
                {playerError && <div className="error-message">Please select at least one player.</div>}
                <AddPlayerToTeamButtons
                    onAddPlayerToTeam={handleAddPlayerToTeam}
                    onSave={handleSave}
                />
            </div>  
        </div>  
    );
}