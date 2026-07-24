import Button from "./Button";
import { Instructions as Constants } from "../constants";

type CardProps = {
  handleClose: () => void;
};
export default function WinCard({ handleClose }: CardProps) {
  return (
    <div className="overlay">
      <div className="modal modal-win">
        <h3 className="modal__title">Game Over</h3>

        <p className="modal__content ">{Constants.win}</p>

        <div className="modal__actions">
          <Button
            label="Play Again"
            handleClick={handleClose}
            className="btn btn-info btn-full"
          />
        </div>
      </div>
    </div>
  );
}
