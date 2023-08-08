import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {addStagiaireAction, filterStagiaireAction, initialiserFilterAction} from "../redux/actions/stagiaireActions"
function AddStagiaire(){
    const emptyStagiaire = {
        matricule:"",
        nom:"",
        prenom:"",
        ville:"",
        codePostal:null,
        moyenne:null
        }
    const [stagiaire, setStagiaire]=useState(emptyStagiaire)
    
    const stagiaires = useSelector((state)=> state.stagiaires)

    const stagiaires2 = useSelector((state)=>state.stagiairesFiltered)

    const [ville,setVille] = useState([{id:1, libelle:"Casablanca"},
                              {id:2, libelle:"Settat"},
                              {id:3, libelle:"Berrechid"}])

    console.log(stagiaires2)

    const dispatch = useDispatch()

    function onInputChange(e){
        let name = e.target.name
        let val = e.target.value
        let _stagiaire = {...stagiaire}
        _stagiaire[name]=val
        setStagiaire(_stagiaire)
      }
    
      useEffect(()=>{
        stagiaires.length > 0 ? 
        setStagiaire({...stagiaire, id:stagiaires[stagiaires.length - 1].id + 1}) :
        setStagiaire({...stagiaire, id:1})
      },[stagiaires.length])

      function ajouterHandler(){        
        //conditions
        let stFound = stagiaires.find(function(st){
        return st.matricule === stagiaire.matricule
        })
        if (!stFound){
        if (stagiaire.moyenne >= 0 && stagiaire.moyenne<=20 && stagiaire.codePostal >= 0 && stagiaire.codePostal<=20){
            if(stagiaire.nom !="" && stagiaire.prenom !=""){
                dispatch(addStagiaireAction(stagiaire))
            }else{
            alert("champs obligatoires")
            }       
        }else{
            alert("la myenne et cp doit etre entre 0 et 20")
        }
        }else{
        alert("matricule doit etre unique")
        }  
      }

      function filterHandler(){
        dispatch(filterStagiaireAction(stagiaire))
      }

      function viderHnadler(){
        setStagiaire(emptyStagiaire)
      }

      function initialiserRechHandler(){
        dispatch({
            type:"INITIALISER_RECHERCHE"
        })
      }
    return(
        <>
            <div>
                <p>
                id       <input name="id" value={stagiaire.id} onChange={onInputChange} readOnly></input> <br/>
                matricule<input name="matricule" value={stagiaire.matricule} onChange={onInputChange}></input><br/>
                nom      <input name="nom" value={stagiaire.nom} onChange={onInputChange}></input><br/>
                prenom   <input name="prenom" value={stagiaire.prenom} onChange={onInputChange}></input><br/>
                ville   
                        <select onChange={onInputChange}>
                            {ville.map(function(item){
                                return <option key={item.id} value={item.id}>{item.libelle}</option> 
                            })}                               
                        </select><br/>
                code postal<input name="codePostal" value={stagiaire.codePostal} onChange={onInputChange}></input><br/>
                moyenne    <input name="moyenne" value={stagiaire.moyenne} onChange={onInputChange}></input>
                </p>
            </div>
            <div>
                <button onClick={ajouterHandler}>Ajouter</button>
                <button onClick={filterHandler}>Filtrer ville et nom</button>
                <button onClick={viderHnadler}>Vider</button>
                <button onClick={initialiserRechHandler}>initialiser recherche</button>
            </div>

            <div>
                <ul>
                {stagiaires2.map(function(st){
                    return <li key={st.id}>{st.matricule} {st.nom} {st.prenom}</li>
                })}     
                </ul>
                {stagiaires2.length === 0 && <h1 style={{color:"red"}}>le tableau des stgs filtré est vide</h1>}
            </div>
        </>
    )
}
export default AddStagiaire