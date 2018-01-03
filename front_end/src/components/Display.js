import React from 'react';

const Display = ({books, onClick}) => {
  console.log(books);
  return (
    <div className="container">
    <div className="row">
    {books.map(book => {
      return (
        <div className="col-md-3">
        <button id={`${book.title[0]}`} className="btn btn-primary" onClick={onClick}> {book.title[0]}</button>
        <img className="img-responsive" src={`${book.image_url[0]}`} alt='empty string because we do not care about disabled people' />
        <p>{book.description[0]}</p>
        </div>
      )
    })}
    </div>
    </div>
  )
}

export default Display
