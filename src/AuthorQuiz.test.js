import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';

test('renders learn react link', () => {
  const { getByText } = render(<AuthorQuiz />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
/*describe("Author Quiz",()=>{
  it("render without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<AuthorQuiz/>,div);
  })
})*/
