import './LastPlayed.scss';

type GameInfo = {
  name?: string;
  image?: string;
  link?: string;
};

type LastPlayedProps = {
  games?: GameInfo[];
  count?: number;
  width?: string;
  height?: string;
};

function LastPlayed({ games = [], count = 7, width = "400px", height = "80px" }: LastPlayedProps) {  
  while (games.length < count) {
    games.push({ name: undefined, image: undefined, link: undefined });
  }

  const handleClick = (link?: string) => {
    if (link) window.location.href = link;
  };

  return (
    <div className="last-played-list">
      {games.map((game, idx) => (
        <div
          key={idx}
          className={`game-rectangle${game.link ? ' clickable' : ''}`}
          style={{ width, height }}
          onClick={game.link ? () => handleClick(game.link) : undefined}
          tabIndex={game.link ? 0 : -1}
          role={game.link ? "button" : undefined}
        >
          {game.image && <img src={game.image} alt={game.name} />}
          {game.name && <span>{game.name}</span>}
        </div>
      ))}
    </div>
  );
};

export default LastPlayed;