import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Fonction callback à éxécuter quand une mutation est observée
const callback = function (mutationsList) {
  for (var mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("Un noeud enfant a été ajouté ou supprimé.");
    } else if (mutation.type === "attributes") {
      console.log("L'attribut '" + mutation.attributeName + "' a été modifié.");
      if (mutation.attributeName === "data-subreddit") {
        ReactDOM.render(
          <React.StrictMode>
            <App subreddit={mutation.target.dataset.subreddit} />
          </React.StrictMode>,
          mutation.target
        );
      }
    }
  }
};

// Créé une instance de l'observateur lié à la fonction de callback
const observer = new MutationObserver(callback);

// Options de l'observateur (quelles sont les mutations à observer)
const config = { attributes: true, childList: true };

const widgetDivs = document.querySelectorAll('.reddit_widget');

widgetDivs.forEach( div => {
  ReactDOM.render(
    <React.StrictMode>
      <App subreddit={div.dataset.subreddit}/>
    </React.StrictMode>,
    div
  );

  observer.observe(div, config);
});

global.reddit_widget = {init: function(el){
  ReactDOM.render(
    <React.StrictMode>
      <App subreddit={el.dataset.subreddit}/>
    </React.StrictMode>,
    el
  );

  observer.observe(el, config);
}};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
