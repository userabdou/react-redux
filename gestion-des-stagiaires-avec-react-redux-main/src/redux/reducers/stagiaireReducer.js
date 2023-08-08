const initialState = {
    stagiaires : [{id:1,
        matricule:"M3565363",
        nom:"amine",
        prenom:"mohamed",
        ville:"CASA",
        codePostal:12,
        moyenne:15
        }],
    stagiairesFiltered : []
}
function stagiaireReducer(state=initialState, action){
    switch (action.type){
        case "ADD_STAGIAIRE":
            return {...state, stagiaires: [...state.stagiaires, action.payload]}
       
        case "UPDATE_STAGIAIRE":
            const stagiaires = state.stagiaires.map(function(st){
                if (st.id == action.payload.id){
                    return action.payload
                }                
                return st
            })
            return {...state, stagiaires: stagiaires}
        
        case "DELETE_STAGIAIRE":
            return {...state, stagiaires: state.stagiaires.filter(function(item){
                return item.id !== action.payload
            })}

        case "FILTER_STAGIAIRE":
            console.log(action)
            let listSt2 = []
                if (action.payload.ville != "" && action.payload.nom != "" ){
                    listSt2 = state.stagiaires.filter(function (item){
                    return item.ville === action.payload.ville && item.nom === action.payload.nom
                    })
                }else if(action.payload.ville != ""){
                    listSt2 = state.stagiaires.filter(function (item){
                        return item.ville === action.payload.ville 
                    })
                }
                else if(action.payload.nom != ""){
                
                    listSt2 = state.stagiaires.filter(function (item){
                        return item.nom === action.payload.nom 
                    })
                }              
            return {...state, stagiairesFiltered:listSt2}

        case "INITIALISER_RECHERCHE":
            return {...state,stagiairesFiltered:[]}
        default:
            return state
        }   
    
}

export default stagiaireReducer