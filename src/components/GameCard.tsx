interface Props {
  name: string;
  image: string;
  rating: number;
}

const GameCard = ({ name, image, rating }: Props) => {
  return (
    <div className="card h-100 rounded-3 shadow-sm">
      <img src={image} className="card-img-top rounded-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Rating: {rating}/10</p>
      </div>
    </div>
  );
};

export default GameCard;
