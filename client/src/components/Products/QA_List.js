import {React, useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';

const QaBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: white;
  margin: 10px 0;
`;

const QaList = ({ product_id, questions, isAdmin, handleAnswerSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  }
  return (
    <div className="qa-list-container">
      <h2 className="qa-list-heading">Questions & Answers</h2>
      {questions && questions.length > 0 ?questions.map((qa) => (
        <QaBox key={qa.id}>
          <div className='answer-heading'>
            <strong className="username">{qa.username}</strong>
            <p className="date-text">{moment(qa.time_asked).format('MMMM DD, YYYY')}</p>
          </div>
          <div>
            <p className='question-text'>{qa.question_text}</p>
          </div>

        {isAdmin && (
          <div>
            <input className='question-textarea' type="text" placeholder="Enter your answer" value={answer} onChange={handleAnswerChange}  />
            <button className='submit-button' onClick={() => handleAnswerSubmit(answer, qa.question_id)}>Submit Answer</button>
        </div>
        )}
          
          {qa.answers.length > 0 ? 
          
          qa.answers.map((answer, index) => {
            return (
              <div className='answer-div' >
                <div className='answer-heading'>
                <strong>{answer.username}</strong>
                <p className="date-text">{moment(answer.time_answered).format('MMMM DD, YYYY')}</p>
                </div>
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
