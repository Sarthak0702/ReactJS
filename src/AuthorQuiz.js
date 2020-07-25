import React from 'react';
//import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Hero(){
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p>Select the book written by the Author shown</p>
    </div>
  </div>)
}

function Book({title,onClick}){
  return(<div className="answer" onClick={()=>{onClick(title);}}>
    <h4>{title}</h4>
  </div>
  ); 
}

function Turn({author,books,highlight,onAsnwerSelected}){
  function highlightToColor(highlight){
    const mapping={
      'none':'',
      'correct':'green',
      'wrong':'red'
    };
    //if(highlight==='wrong')console.log("true");
    return mapping[highlight];
  }

  return(<div className="row turn" style={{backgroundColor: highlightToColor(highlight)}} >
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorimage" alt="Author"/>
    </div>
    <div className="col-lg-6">
      {books.map((title)=><Book title={title} key={title} onClick={onAsnwerSelected}></Book>)}
    </div>
  </div>);
};

Turn.propTypes={
    highlight: PropTypes.string.isRequired,
    onAsnwerSelected: PropTypes.func.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageSource: PropTypes.string.isRequired,
      books: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    books: PropTypes.arrayOf(PropTypes.string).isRequired,
}


function Continue({show,onContinue}){
  return(
    <div className='row continue'>
      { show
        ?<div className='col-11'>
          <button className='btn btn-primary btn-lg float-right' onClick={onContinue}>Continue</button>
        </div>
        :null
      }
    </div>
  );
}

function Footer(){
  return (<div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">
        All images are from 
        <a href="https://commons.wikimedia.org/wiki/Main_Page"> Wekimedia Commons </a>
        and are in the public Domain
      </p>
    </div>
  </div>
  );
}

function AuthorQuiz ({turnData,highlight,onAsnwerSelected,onContinue}) {
  return (
    <div className="container-fluid">
      <Hero/>
      <Turn {...turnData} highlight={highlight} onAsnwerSelected={onAsnwerSelected}/>
      <Continue show={highlight==='correct'} onContinue={onContinue}/>
      <p><Link to="/add">Add a Author</Link></p>
      <Footer/>
    </div>
  );
}

export default AuthorQuiz;
