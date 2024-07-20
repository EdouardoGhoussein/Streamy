interface Props {
  image: string;
  name: string;
  description: string;
  percent: number;
}

const AchievementDesc = ({ image, name, description, percent }: Props) => {
  return (
    <>
      <div className="d-flex align-items-center m-0">
        <img
          src={image}
          alt={name}
          className="rounded-circle me-3"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            border: "1.5px solid white",
          }}
        />
        <div className="flex-grow-1 achievement">
          <h5 className="mb-2">{name}</h5>
          <p className="mb-2">{description}</p>
          <div className="progress" style={{ height: "15px" }}>
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
      <div className="d-flex mt-4 justify-content-center align-items-center">
        <hr />
      </div>
    </>
  );
};

export default AchievementDesc;
