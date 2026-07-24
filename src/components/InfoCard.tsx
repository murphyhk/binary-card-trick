import Button from "./Button";

type CardProps = {
  type: string;
  info: string;
  handleClose: () => void;
};

export default function InfoCard({ type, info, handleClose }: CardProps) {
  return (
    <div className="modal modal-info">
      <h3 className="modal__title">{type}</h3>

      <p className="modal__content whitespace-pre-line">{info}</p>

      <div className="modal__actions">
        <Button
          label="Close"
          handleClick={handleClose}
          className="btn btn-info btn-full"
        />
      </div>
    </div>
  );
}
