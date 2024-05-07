import React from "react";

export default function AddPlayerToTeamButtons(props) {

    const handleClickAdd = () => {
        props.onAddPlayerToTeam();
    };

    const handleClickSave = () => {
        props.onSave();
    };

    return(
        <div className="item-buttons">
            <button
                type="button"
                id="btn"
                onClick={handleClickAdd}
            >Add player to the team
            </button>
            <button
                type="button"
                id="btn-save"
                onClick={handleClickSave}
            >Save
            </button> 
        </div>
    )
}