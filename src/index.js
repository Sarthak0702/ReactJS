import React from 'react';//JSX
import ReactDOM from 'react-dom'; //for render()
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle,sample} from 'underscore';
import {BrowserRouter,Route,withRouter} from 'react-router-dom';
//import { func } from 'prop-types';
const authors=[
  {
    name: 'Mark Twain',
    imageUrl:'images/authors/marktwain.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'Adventures of Huckleberry Finn',
      'Life of the Mississippi',
      'Roghing It',
    ]
  },
  {
    name: 'J.K.Rowling',
    imageUrl:'images/authors/jKRowling.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'The Harry Potter series',
      'The Casual Vacancy',
      'Fantastic Beasts',
      'The Silkworm',
      'Career of Evil',
    ]
  },
  {
    name: 'Stephen King',
    imageUrl:'images/authors/stephenKing.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'It',
      'The Shining',
      'The Institute',
      'The Dead Zone',
      'Carrie',
      'Pet Sematary',
    ]
  },
  {
    name: 'Dan Brown',
    imageUrl:'images/authors/danBrown.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'The Da Vinci Code',
      'Angels & Demons',
      'Inferno',
      'Deception Point',
      'The Lost Symbol',
      'Digital Fortress',
    ]
  },
  {
    name: 'Nicholas Sparks',
    imageUrl:'images/authors/nicholasSparks.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'The Notebook',
      'A walk to remember',
      'The Longest Ride',
      'Dear John',
      'The Last Song',
      'The Wedding',
    ]
  },
  {
    name: 'Suzanne Collins',
    imageUrl:'images/authors/suzanneCollins.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'The Hunger Games series',
      'The Underland Chronicles',
      'Year of the Jungle',
      'Fire Proof',
    ]
  },
  {
    name: 'Khaled Hosseini',
    imageUrl:'images/authors/khaledHosseini.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'A thousand splendid suns',
      'The Kite runner',
      'Sea Prayer',
      'And the mountains echoed',
    ]
  },
  {
    name: 'Ruskin Bond',
    imageUrl:'images/authors/ruskinBond.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'Susannas Seven Husbands',
      'Death under the Deodars',
      'Roads to Mussoorie',
      'The Room on the roof',
      'The adventures of Rusty',
    ]
  },
  {
    name: 'John Green',
    imageUrl:'images/authors/johnGreen.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'The Fault in Our Stars',
      'Looking for Alaska',
      'Paper Towns',
      'An abundance of Katherines',
    ]
  },
  {
    name: 'Virginia Woolf',
    imageUrl:'images/authors/virginiaWoolf.jpg',
    imageSource:'Wikemedia Commoms',
    books:[
      'Mrs Dalloway', 
      'To the Lighthouse',
      'Orlando',
      'A Room of Ones Own ',
      'The Waves',
    ]
  },
];

function getTurnData(authors){
  const allBooks=authors.reduce(function(p,c,i){
    return p.concat(c.books);
  },[]);
  const fourRandomBooks=shuffle(allBooks).slice(0,4);
  const answer=sample(fourRandomBooks);
  return{
    books: fourRandomBooks,
    author: authors.find((author)=> 
      author.books.some((title)=> 
        title === answer))
  }
}

function resetState(){
  return {
    turnData: getTurnData(authors),
    highlight: '',
  };
}
let state=resetState();

function onAsnwerSelected(answer){
  const isCorrect=state.turnData.author.books.some((book)=>book === answer);
  state.highlight=isCorrect?'correct':'wrong';
  render();
}

function App(){
  return(
  <AuthorQuiz {...state} 
    onAsnwerSelected={onAsnwerSelected}
    onContinue={()=>{
      state=resetState();
      render();
    }}/> 
  );
}

const AuthorWrapper= withRouter(({ history })=>
   <AddAuthorForm onAddAuthor={(author)=>{
    authors.push(author);
    history.push('/');
  }}/>
);

function render(){
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App}/>
        <Route path="/add" component={AuthorWrapper}/>
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')// DOM melement into which compment is rendered
  );
}
render();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
