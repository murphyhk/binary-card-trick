type CardProps = {
  value: 0 | 1;
  onClick: () => void;
  gameState: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
};

export default function Card({
  value,
  onClick,
  gameState,
  isCorrect = false,
  isIncorrect = false,
}: CardProps) {
  const flipped = value === 0;

  return (
    <div
      className={`card ${gameState ? "card--locked" : ""} ${
        isCorrect ? "card--correct" : ""
      }${isIncorrect ? "card--incorrect" : ""}
      }`}
      onClick={onClick}
    >
      <div className={`card__inner ${flipped ? "card__inner--flipped" : ""}`}>
        <div className="card__front">1</div>
        <div className="card__back">0</div>
      </div>
    </div>
  );
}
