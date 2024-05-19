import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

export default function DataRender(props) {

    const handleClick = () => {
        props.onTeamPlayerClick();
    };

    const handleActive = () => {
        props.toggleActive();
    };

    const handleDelete = () => {
        if (props.onDelete) {
            props.onDelete(props.data); // Pass the data to be deleted to the onDelete function
        }
    };
    
    const renderPlayersSpan = () => {
        if (props.spanTitle === "Players:" && props.subelement.length === 0) {
            return null; // If there are no players assigned, don't render anything
        } else if (props.spanTitle === "Players:" && props.subelement.length === 1) {
            return <span>Player:</span>; // If there is only one player, render "Player:"
        } else if (props.spanTitle === "Players:" && props.subelement.length > 1) {
            return <span>Players:</span>; // If there are multiple players, render "Players:"
        } else {
            return <span>{props.spanTitle}</span>; // For teams, render the provided spanTitle
        }
    };

    const renderSubelement = () => {
        if (props.spanTitle === "Team:") {
            return (
                <>
                    <span>Team:</span>
                    <li>{props.subelement}</li>
                </>
            );
        } else {
            if (Array.isArray(props.subelement)) {
                return (
                    <>  
                        
                        {renderPlayersSpan()}
                        {props.subelement.length > 0 && (
                            <ul>
                                {props.subelement.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </>
                );
            } else {
                return <span>{props.subelement}</span>;
            }
        }
        
    };
    //const [playerImage, setPlayerImage] = useState(props.image || "https://cdn-icons-png.flaticon.com/512/146/146031.png");
    //const [photoUrl, setPhotoUrl] = useState(props.image); // Local state to manage the photo URL
    /*
    const handlePhotoChange = (newPhotoUrl) => {
        setPlayerImage(newPhotoUrl);
        if (props.onPhotoChange) {
            props.onPhotoChange(newPhotoUrl);
        }
    };
*/
    const [photoUrl, setPhotoUrl] = useState(props.image || "https://cdn-icons-png.flaticon.com/512/146/146031.png");
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const newPhotoUrl = reader.result;
                setPhotoUrl(newPhotoUrl); // Update the local state with the new photo URL
                props.onPhotoChange(props.id, newPhotoUrl); // Pass the new photo URL to the onPhotoChange function
            };
        }
    };

    //const navigate = useNavigate();

    const handleButtonClick = () => {
        if (props.buttonLists === "Photo") {
            document.getElementById(`photo-upload-${props.id}`).click();
        } else if (props.buttonLists === "Show team") {
            props.onShowTeamClick(); // Call the function passed as prop
            
        }
    };
    //handleActive();
    return(
        <div className="dataLists--list">
                <div className={`dataLists--box ${props.active ? 'active' : ''}`} >
                    <div className="dataLists--info" onClick={() => {
                            handleClick();
                            handleActive();
                        }}>
                        <strong>{props.name}</strong>
                            <div className="dataListsListed--box">
                                {renderSubelement()}
                            </div>
                    </div>
                    <div className="dataLists--buttons">
                        {props.buttonLists === "Photo" && (
                            <>
                                <button id="btn" onClick={() => document.getElementById(`photo-upload-${props.id}`).click()}>Photo</button>
                                <input
                                    id={`photo-upload-${props.id}`}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handlePhotoUpload(e)}
                                />
                            </>
                        )}
                        {props.buttonLists === "Show team" && (
                            <button id="btn" onClick={handleButtonClick}>Show Team</button>
                        )}
                        <button id="btn-delete" onClick={handleDelete}>Delete</button>
                        
                    </div>
                </div>
               
        </div>
    )
}