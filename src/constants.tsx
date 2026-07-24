export const Instructions = {
  welcome: "Welcome!",
  howTo: "How to play:",

  step1: `Choose a board size to set the difficulty.`,
  step2: `Before starting, flip any board cards to create your own binary pattern.`,
  step3: `Press Play when you're ready.`,
  step4: `Set the parity cards around the edge of the board based on the binary values in each row and column.`,
  step5: `Once all parity cards are set, one board card will be secretly flipped.`,
  step6: `Use the parity clues to work out which card changed.`,
  step7: `Select board cards to make guesses until you find the flipped card.`,
  step8: `Find the correct card to win and play again!`,
  stepTip: `Hit reset if you get stuck or want a different card layout`,

  binaryInformation: `Everything inside a computer is built on just two values: 0 and 1. A 0 typically represents "off" and a 1 represents "on". These values form a number system called binary (base-2). While we normally count using ten digits 0-9 (base-10).

        This means numbers look quite different, but the counting rules are similar. When a digit reaches its limit, it rolls back to 0 and carries a 1 to the next column, just like how 9 rolls over to 10 in normal counting. 
    
        Understanding binary is one of the first steps to understanding how computers think and process information.`,

  binaryExample: `1 → 0001
        2 → 0010
        3 → 0011
        4 → 0100
        5 → 0101
        6 → 0110
        7 → 0111
        8 → 1000
        9 → 1001
        10 → 1010`,

  parityInformation: `Parity bits are a simple form of error detection used when data is transmitted or stored. An extra bit is added to the original data so that the total number of 1s is either odd or even.

        With even parity:
        • Odd number of 1s → add 1
        • Even number of 1s → add 0

        The receiving computer checks the parity. If the total number of 1s is not even, the data may have been corrupted during transmission.`,

  parityExample: `1011011 → Odd number of 1s → Add 1 → 10110111
        1100100 → Odd number of 1s → Add 1 → 11001001
        1011001 → Even number of 1s → Add 0 → 10110010`,

  win: `You are a Winner!`,
};
