import { useSelector, useDispatch } from "react-redux"
import { deleteStagiaireAction } from "../redux/actions/stagiaireActions"
function ListStagiaires(){
    const stagiaires = useSelector((state)=> state.stagiaires)

    const dispatch = useDispatch()
    function supprimerHandler(id){
       dispatch(deleteStagiaireAction(id))
    }
    
    function editerHandler(id){
        
    }
    return(
        <>
            <table border={1}>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>matricule</th>
                    <th>nom</th>
                    <th>prenom</th>
                    <th>ville</th>
                    <th>code postal</th>
                    <th>moyenne</th>
                    </tr>
                </thead>
                <tbody>
                    {stagiaires.map(function(st){
                    return (<tr key={st.id}>
                                <td>{st.id}</td>
                                <td>{st.matricule}</td>
                                <td>{st.nom}</td>
                                <td>{st.prenom}</td>
                                <td>{st.ville}</td>
                                <td>{st.codePostal}</td>
                                <td>{st.moyenne}</td>
                                <td><button onClick={()=>supprimerHandler(st.id)}>Supprimer</button></td>
                                <td><button onClick={()=>editerHandler(st.id)}>Editer</button></td>
                    </tr>)
                    })}            
                </tbody>
                </table>
                {stagiaires.length === 0 && <h1 style={{color:"red"}}>le tableau des stgs est vide</h1>}
        </>
    )
}

export default ListStagiaires