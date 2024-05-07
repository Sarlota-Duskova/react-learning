import React from 'react';
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

    const handlePhotoChange = (event) => {
        console.log('onPhotoChange prop:', props.onPhotoChange);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imageUrl = reader.result;
            props.onPhotoChange(props.id, imageUrl);
          
            console.log("Updated photo URL:", imageUrl);
        };

        if (file) {
            reader.readAsDataURL(file);
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
                        <button id="btn" onClick={handleButtonClick}>{props.buttonLists}</button>
                        <button id="btn-delete" onClick={handleDelete}>Delete</button>
                        <input
                            id={`photo-upload-${props.id}`}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{ display: "none" }} 
                        />
                    </div>
                </div>
               
        </div>
    )
}