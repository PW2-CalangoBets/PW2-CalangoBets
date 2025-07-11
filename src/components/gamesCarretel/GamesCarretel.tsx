import "./GamesCarretel.scss";

type GameInfo = {
  name: string;
  image: string;
  link?: string;
  subtitle?: string;
};

type GamesCarretelProps = {
  title: string;
  games: GameInfo[];
  height?: string;
};

function GamesCarretel({ title, games, height = "240px" }: GamesCarretelProps) {
  const handleClick = (link?: string) => {
    if (link) window.location.href = link;
  };

  return (
    <div className="games-carretel-container" style={{ height }}>
      <h2 className="games-carretel-title">{title}</h2>
      <div className="games-carretel-list">
        {games.map((game, idx) => (
          <div
            key={idx}
            className={`games-carretel-item${game.link ? " clickable" : ""}`}
            onClick={game.link ? () => handleClick(game.link) : undefined}
            tabIndex={game.link ? 0 : -1}
            role={game.link ? "button" : undefined}
          >
            <img src={game.image} alt={game.name} className="games-carretel-img" />
            <span className="games-carretel-name">{game.name}</span>
            {game.subtitle && (
              <span className="games-carretel-subtitle">{game.subtitle}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesCarretel;