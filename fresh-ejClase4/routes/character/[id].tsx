import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "axios";
import Character from "../../components/Character.tsx";
import axios from "axios";

type Episode = {
  id: string;
  name: string;
};

type Data = { //lo que paso hacia abajo
  id: string;
  name: string;
  status: string;
  origin: string;
  image: string;
  episodes: Episode[];
};

type CharacterAPI = { //lo que me llega de la API
  id: string;
  name: string;
  status: string;
  origin: { name: string };
  image: string;
  episode: string[];
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const id = ctx.params.id;
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    try {
      const character = await Axios.get<CharacterAPI>(url);
      const episodesURL = character.data.episode;

      const episodes = await Promise.all(episodesURL.map(async (url) => {
        const ep = await axios.get<Episode>(url);
        return {
          name: ep.data.name,
          id: ep.data.id,
        };
      }));

      const ch = {
        ...character.data,
        origin: character.data.origin.name,
        episodes,
      };

      return ctx.render(ch);
    } catch (e) {
      throw new Error("Error");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <>
      <Character character={props.data} />
    </>
  );
};

export default Page;
