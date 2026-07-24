import { Fragment, useEffect, useState } from "react";
import Card from "./Card";
import ParityCard from "./ParityCard";

type GridProps = {
  size: number | string;
  gameState: boolean;
  onParityComplete: (complete: boolean) => void;
  flipCount: number;
  boardLocked: boolean;
  onGameWon: (won: boolean) => void;
};

type CardValue = 0 | 1;
type ParityValue = 0 | 1 | "?";
type FlippedCard =
  | { type: "corner" }
  | { type: "top"; index: number }
  | { type: "left"; index: number }
  | { type: "board"; index: number };

export default function Grid({
  size,
  gameState,
  onParityComplete,
  flipCount,
  boardLocked,
  onGameWon,
}: GridProps) {
  const gridSize = Number(size);
  const totalCards = gridSize * gridSize;

  const createRandomCards = (total: number): CardValue[] =>
    Array.from({ length: total }, () => (Math.random() < 0.5 ? 0 : 1));

  const createEmptyParityCards = (): ParityValue[] => Array(gridSize).fill("?");

  const toggleBinary = (value: CardValue): CardValue => (value === 0 ? 1 : 0);

  const nextParityValue = (value: ParityValue): CardValue =>
    value === "?" ? 0 : toggleBinary(value);

  const toggleArrayItem = <T,>(
    items: T[],
    tagetIndex: number,
    getNextValue: (value: T) => T,
  ) =>
    items.map((item, index) =>
      index === tagetIndex ? getNextValue(item) : item,
    );

  const [cards, setCards] = useState<CardValue[]>(Array(totalCards).fill(1));
  const [cornerParity, setCornerParity] = useState<ParityValue>("?");
  const [topParityCards, setTopParityCards] = useState<ParityValue[]>(
    createEmptyParityCards,
  );
  const [leftParityCards, setLeftParityCards] = useState<ParityValue[]>(
    createEmptyParityCards,
  );
  const [flippedCard, setFlippedCard] = useState<FlippedCard | null>(null);
  const [correctGuess, setCorrectGuess] = useState<FlippedCard | null>(null);
  const [guessedCards, setGuessedCards] = useState<FlippedCard[]>([]);

  // Parity card reset
  function resetParityCards() {
    setCornerParity("?");
    setTopParityCards(createEmptyParityCards());
    setLeftParityCards(createEmptyParityCards());
  }

  function getRandomFlippedCard(): FlippedCard {
    const possibleCards: FlippedCard[] = [
      { type: "corner" },

      ...topParityCards.map((_, index) => ({
        type: "top" as const,
        index,
      })),

      ...leftParityCards.map((_, index) => ({
        type: "left" as const,
        index,
      })),

      ...cards.map((_, index) => ({
        type: "board" as const,
        index,
      })),
    ];

    return possibleCards[Math.floor(Math.random() * possibleCards.length)];
  }

  // Flip random card
  function flipCard(card: FlippedCard) {
    switch (card.type) {
      case "corner":
        setCornerParity((current) => nextParityValue(current));
        break;

      case "top":
        setTopParityCards((current) =>
          toggleArrayItem(current, card.index, nextParityValue),
        );
        break;

      case "left":
        setLeftParityCards((current) =>
          toggleArrayItem(current, card.index, nextParityValue),
        );
        break;

      case "board":
        setCards((current) =>
          toggleArrayItem(current, card.index, toggleBinary),
        );
        break;
    }
  }

  // Flip card over on user click
  function toggleCard(index: number) {
    if (gameState) return;

    setCards((current) => toggleArrayItem(current, index, toggleBinary));
  }

  // Flip parity card on user click
  function toggleParityCard(
    index: number,
    setParityCards: React.Dispatch<React.SetStateAction<ParityValue[]>>,
  ) {
    if (boardLocked) return;

    setParityCards((current) =>
      toggleArrayItem(current, index, nextParityValue),
    );
  }

  function handleCornerParityClick() {
    if (boardLocked) {
      userGuess({ type: "corner" });
      return;
    }
    setCornerParity(nextParityValue);
  }

  function isSameCard(a: FlippedCard, b: FlippedCard) {
    if (a.type !== b.type) return false;
    if (a.type === "corner" && b.type === "corner") {
      return true;
    }
    if (a.type === "corner" || b.type === "corner") {
      return false;
    }

    return a.index === b.index;
  }

  function isIncorrectGuess(card: FlippedCard) {
    return guessedCards.some((guess) => isSameCard(guess, card));
  }

  // user selecting their guess
  function userGuess(card: FlippedCard) {
    if (!boardLocked || !flippedCard) return;

    const alreadyGuessed = guessedCards.some((guess) =>
      isSameCard(guess, card),
    );
    if (alreadyGuessed) return;
    const correct = isSameCard(card, flippedCard);

    // const sameType = card.type === flippedCard.type;
    // const sameIndex =
    //   "index" in card && "index" in flippedCard
    //     ? card.index === flippedCard.index
    //     : true;
    // const correct = sameType && sameIndex;

    if (correct) {
      setCorrectGuess(card);
      onGameWon(correct);
      return;
    }
    setGuessedCards((currentGuesses) => [...currentGuesses, card]);
  }

  // Flip one random card after the board has been hidden.
  useEffect(() => {
    if (flipCount === 0) return;

    const randomCard = getRandomFlippedCard();

    setFlippedCard(randomCard);
    flipCard(randomCard);
  }, [flipCount]);

  // Set up parity cards as ?
  useEffect(() => {
    const allParityCardsSet =
      cornerParity !== "?" &&
      topParityCards.every((value) => value !== "?") &&
      leftParityCards.every((value) => value !== "?");

    onParityComplete(allParityCardsSet);
  }, [cornerParity, topParityCards, leftParityCards, onParityComplete]);

  // Set the board out
  useEffect(() => {
    const randomCards = createRandomCards(totalCards);

    setCards(Array(totalCards).fill(1));
    resetParityCards();
    setFlippedCard(null);

    const timeout = setTimeout(() => {
      setCards(randomCards);
    }, 80);

    return () => clearTimeout(timeout);
  }, [totalCards]);

  if (gameState) {
    return (
      <div
        className="card-grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize + 1}, 1fr)`,
        }}
      >
        <ParityCard
          value={cornerParity}
          onClick={handleCornerParityClick}
          gameState={boardLocked}
          isCorrect={correctGuess?.type === "corner"}
          isIncorrect={isIncorrectGuess({ type: "corner" })}
        />

        {topParityCards.map((value, index) => (
          <ParityCard
            key={`top-parity-${index}`}
            value={value}
            onClick={() => {
              if (boardLocked) userGuess({ type: "top", index });
              toggleParityCard(index, setTopParityCards);
            }}
            gameState={boardLocked}
            isCorrect={
              correctGuess?.type === "top" && correctGuess.index === index
            }
            isIncorrect={isIncorrectGuess({ type: "top", index })}
          />
        ))}

        {Array.from({ length: gridSize }).map((_, rowIndex) => (
          <Fragment key={`row-${rowIndex}`}>
            <ParityCard
              value={leftParityCards[rowIndex]}
              onClick={() => {
                if (boardLocked) userGuess({ type: "left", index: rowIndex });
                toggleParityCard(rowIndex, setLeftParityCards);
              }}
              gameState={boardLocked}
              isCorrect={
                correctGuess?.type === "left" && correctGuess.index === rowIndex
              }
              isIncorrect={isIncorrectGuess({ type: "left", index: rowIndex })}
            />

            {cards
              .slice(rowIndex * gridSize, rowIndex * gridSize + gridSize)
              .map((value, columnIndex) => {
                const cardIndex = rowIndex * gridSize + columnIndex;

                return (
                  <Card
                    key={cardIndex}
                    value={value}
                    onClick={() => {
                      if (boardLocked)
                        userGuess({ type: "board", index: cardIndex });
                      toggleCard(cardIndex);
                    }}
                    gameState={gameState}
                    isCorrect={
                      correctGuess?.type === "board" &&
                      correctGuess.index === cardIndex
                    }
                    isIncorrect={isIncorrectGuess({
                      type: "board",
                      index: cardIndex,
                    })}
                  />
                );
              })}
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <div
      className="card-grid"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {cards.map((value, index) => (
        <Card
          key={index}
          value={value}
          onClick={() => toggleCard(index)}
          gameState={gameState}
        />
      ))}
    </div>
  );
}
