interface Props {
  image: string;
  name: string;
  description: string;
  percent: number;
}

const AchievementDesc = ({ image, name, description, percent }: Props) => {
  return (
    <div className="d-flex align-items-center p-3 border-bottom">
      <img
        src={image}
        alt={name}
        className="rounded-circle me-3"
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />
      <div className="flex-grow-1">
        <h5 className="mb-1">{name}</h5>
        <p className="mb-1 text-muted">{description}</p>
        <div className="progress" style={{ height: "5px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%` }}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
};

export default AchievementDesc;
