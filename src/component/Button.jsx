const Button = ({
  handleStartAgain,
  handleShowAnswer,
  checkAnswers,
}) => {
  return (
    <div className="action-buttons-container">
      
      {/* Start Again */}
      {handleStartAgain && (
        <button
          onClick={handleStartAgain}
          className="try-again-button"
        >
          Start Again ↻
        </button>
      )}

      {/* Show Answer */}
      {handleShowAnswer && (
        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
      )}

      {/* Check Answer */}
      {checkAnswers && (
        <button
          onClick={checkAnswers}
          className="check-button2"
        >
          Check Answer ✓
        </button>
      )}
    </div>
  );
};

export default Button;