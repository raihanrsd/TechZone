import React, { useState } from 'react';

const QaAddComponent = ({ product_id,  onQuestionSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = () => {
    onQuestionSubmit({ question, product_id });
    setQuestion('');
  };

  return (
    <div className="qa-add-container">
      <h2 className="qa-add-heading">Ask a Question</h2>
      <div className="question-section">
        <label className="question-label">
          Question:
          <textarea
            value={question}
            onChange={handleQuestionChange}
            rows="4"
            cols="50"
            className="question-textarea"
          />
        </label>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit Question
      </button>
    </div>
  );
};

export default QaAddComponent;
