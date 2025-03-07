import { FunctionComponent } from "preact/src/index.d.ts";
type Episode = {
  id: string;
  name: string;
};
export type Props = {
  character: {
    id: string;
    name: string;
    status: string;
    origin: string;
    image: string;
    episodes: Episode[];
  };
};

const Character: FunctionComponent<Props> = (props) => {
  const character = props.character; // se hace para que haya una sola props
  return (
    <div class="characterContainer">
      <h1>{character.name}</h1>
      <div class="characterCart">
        <img src={character.image} alt={character.name} />
        <div>
          <div>Status: {character.status}</div>
          <div>Origin: {character.origin}</div>
          <div>
            Episodes:
            <ul>
              {character.episodes.map((ep) => <div key={ep.id}>{ep.name}</div>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
