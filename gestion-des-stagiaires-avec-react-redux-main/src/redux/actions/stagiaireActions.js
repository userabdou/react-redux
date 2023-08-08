export function addStagiaireAction(stagiaire){
    return(
        {
            type:"ADD_STAGIAIRE",
            payload:stagiaire 
        }
    )
}
export function updateStagiaireAction(stagiaire){
    return(
        {
            type:"UPDATE_STAGIAIRE",
            payload:stagiaire 
        }
    )
}

export function deleteStagiaireAction(idStagiaire){
    return(
        {
            type:"DELETE_STAGIAIRE",
            payload:idStagiaire 
        }
    )
}

export function filterStagiaireAction(filterItems){
    return(
        {
            type:"FILTER_STAGIAIRE",
            payload:filterItems 
        }
    )
}

