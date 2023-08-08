# abdelmoughit
# Getting started with redux
npm install redux react-redux

# Three concepts of redux : Action - Reducer - Store

# ACTION
   ### objet
```javascript 
const action = {
    type: "AJOUTER_ARTICLE",
    payload : {id:2, libelle:"KEYBOARD", quantite:2, prix:100}
}
```
   ### fonction créateur d'action 
```javascript
export function addPanierAction(newArticle){
    return({
        type:"AJOUTER_ARTICLE",
        payload:newArticle
    })
}
```

# REDUCER 
   ### fonction : deux argruments (state, action) 

   ```javascript
const initialState = 
{
    user:{id:1, username:"abdelmoughit"},
    articles:[
        {id:1, designation:"Mouse", famille:"CONSOMMABLE"},
        {id:2, designation:"Keyboard", famille:"CONSOMMABLE"}     
    ],
    categories:[],
    fournisseurs:[]
}
function articleReducer(state=initialState,action){
    switch(action.type){
        case "AJOUTER_ARTICLE":
            ///ajouter le code de l'ajout
            return {...state,articles:[...state.articles,action.payload]}
        case "MODIFIER_ARTICLE":
            ///ajouter le code de la modification
            const articles = state.articles.map(function(article){
                if (article.id === parseInt(action.payload.id)){
                    return action.payload
                }
                return article
            })
            return {...state, articles:articles}
        case "SUPPRIMER_ARTICLE":
            ///ajouter le code de la suppression
            return {...state,articles:[...state.articles.filter(function(item){
                return item.id !== action.payload
            })]}
        default:
            return state
    }
}
export default articleReducer
   ```

# STORE : store.js
```javascript
    import { legacy_createStore } from "redux";
    import articleReducer from "./reducers/articleReducer";

    const store = legacy_createStore(articleReducer)
    export default store
    ```

   ## combineReducers

   
   ```javascript
    import { legacy_createStore, combineReducers } from "redux";
    import articleReducer from "./reducers/articleReducer";

    const reducers = combineReducers({
        article : articleReducer,
        fournisseur: fournisseurReducer
    })
    const store = legacy_createStore(reducers)
    export default store
    ```
   ```

# Index.js : Provider

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

import './style.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
```

# useDispatch : 
    
    ```javascript
        const dispatch = useDispatch()
        dispatch (addArticleAction(article))
    ```
    

# useSelector : 

```javascript
    const list_article = useSelector((state)=>state.articles)
```
   ## combineReducers

   ```javascript
    const list_article = useSelector((state)=>state.articleReducer.articles)
    ```
