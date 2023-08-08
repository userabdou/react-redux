import { useSelector } from "react-redux"
function Statistique(){
    const stagiaires = useSelector((state)=>state.stagiaires)
    return(
        <>
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
    )
}

export default Statistique