import React from 'react';
import styled from 'styled-components';

const QaBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: white;
  margin: 10px 0;
`;

const QaList = ({ product_id, questions }) => {
  return (
    <div className="qa-list-container">
      <h2 className="qa-list-heading">Questions & Answers</h2>
      {questions && questions.length > 0 ?questions.map((qa) => (
        <QaBox key={qa.id}>
          <div>
            <span className="username">{qa.user}</span>
          </div>
          <div>
            <p className='question-text'>{qa.question_text}</p>
          </div>
          {qa.answers.length > 0 ? 
          
          qa.answers.map((answer) =>{
            return (
              <div>
                <strong>Answer:</strong>
                <p>{answer.answer_text}</p>
              </div>
            );
          })
          : <p>No Answers Yet</p>
        
        }
        </QaBox>
      )): <p>No questions yet</p>
    
    }
    </div>
  );
};

export default QaList;
