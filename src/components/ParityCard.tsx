type CardProps = {
  value: 0 | 1 | "?";
  onClick: () => void;
  gameState: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
};

export default function ParityCard({
  value,
  onClick,
  gameState,
  isCorrect = false,
  isIncorrect = false,
}: CardProps) {
  return (
    <div
      className={`card card--parity ${gameState ? "card--locked" : ""} ${
        isCorrect ? "card--correct" : ""
      }${isIncorrect ? "card--incorrect" : ""}
      }`}
      onClick={onClick}
    >
      {value === "?" && <div className="card__question">?</div>}

      <div
        className={`card__inner ${value === 1 ? "card__inner--flipped" : ""}`}
      >
        <div className="card__front">1</div>
        <div className="card__back">0</div>
      </div>
    </div>
  );
}
