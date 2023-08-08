import { useState, useEffect } from "react";
function App() {
  const emptyStagiaire = {
                          matricule:"",
                          nom:"",
                          prenom:"",
                          ville:"",
                          codePostal:null,
                          moyenne:null
                          }
  const [stagiaire, setStagiaire]=useState(emptyStagiaire)
  const [stagiaires, setStagiaires]=useState([])
  const [stagiaires2, setStagiaires2]=useState([])
                      
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

  const listSt = [{id:1,
    matricule:"M3565363",
    nom:"amine",
    prenom:"mohamed",
    ville:"CASA",
    codePostal:12,
    moyenne:15
    }]
  useEffect(()=>{
    setStagiaires(listSt)
  },[])

  function ajouterHandler(){
    //conditions
    console.log(stagiaire)
    let stFound = stagiaires.find(function(st){
      return st.matricule === stagiaire.matricule
    })
    if (!stFound){
      if (stagiaire.moyenne >= 0 && stagiaire.moyenne<=20 && stagiaire.codePostal >= 0 && stagiaire.codePostal<=20){
        if(stagiaire.nom !="" && stagiaire.prenom !=""){
          setStagiaires([...stagiaires,stagiaire])
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

  function supprimerHandler(id){
    setStagiaires(stagiaires.filter(function(st){
      return st.id !== id
    }))
  }

  function editerHandler(id){
    let _stagiaire = stagiaires.find(function(st){
      return st.id === id
    })
    console.log(_stagiaire)
    setStagiaire(_stagiaire)
  }

  function viderHnadler(){
    setStagiaire(emptyStagiaire)
  }

  function filterHandler(){
    let listSt2 = []
    if (stagiaire.ville != "" && stagiaire.nom != "" ){
      console.log("111")
      listSt2 = stagiaires.filter(function (item){
       return item.ville === stagiaire.ville && item.nom === stagiaire.nom
      })
    }else if(stagiaire.ville != ""){
      console.log("222")
      listSt2 = stagiaires.filter(function (item){
        return item.ville === stagiaire.ville 
       })
    }
    else if(stagiaire.nom != ""){
      console.log("3333")
      listSt2 = stagiaires.filter(function (item){
        return item.nom === stagiaire.nom 
       })
    }
    setStagiaires2(listSt2)
  }

  function initialiserRechHandler(){
    setStagiaires2([])
  }
  return (
    <>      
      <div>
          <p>
          id       <input name="id" value={stagiaire.id} onChange={onInputChange} readOnly></input> <br/>
          matricule<input name="matricule" value={stagiaire.matricule} onChange={onInputChange}></input><br/>
          nom      <input name="nom" value={stagiaire.nom} onChange={onInputChange}></input><br/>
          prenom   <input name="prenom" value={stagiaire.prenom} onChange={onInputChange}></input><br/>
          ville    <input name="ville" value={stagiaire.ville} onChange={onInputChange}></input><br/>
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
      </div>
      <div>
        <ul>
          {stagiaires2.map(function(st){
            return <li key={st.id}>{st.matricule} {st.nom} {st.prenom}</li>
          })}     
        </ul>
        {stagiaires2.length === 0 && <h1 style={{color:"red"}}>le tableau des stgs filtré est vide</h1>}
      </div>
      <div>
      <ul>
        <li>la moyenne générale la plus elevée : {Math.max(...stagiaires.map(function(item){
          return item.moyenne
        }))}</li>
        <li>la moyenne générale la moins elevée : {Math.min(...stagiaires.map(function(item){
          return item.moyenne
        }))}</li>
        <li>La moyenne générale de la classe : {stagiaires.reduce((somme, currentItem)=> somme + parseInt(currentItem.moyenne) / stagiaires.length, 0)}</li>
      </ul>
      </div>     
    </>
  );
}

export default App;
