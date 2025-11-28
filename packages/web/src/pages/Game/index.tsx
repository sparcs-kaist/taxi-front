import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Store from "./Store";
import Money from "./Money";
import GameMain from "./GameMain";

const Game = () => {
    const { page } = useParams() as {
      page: string;
    };

    useEffect(() => {
        console.log(page);
    }, [page]);

    switch (page) {
        case "store":
            return <Store />;
        case "money":
            return <Money />;
        default:
            return <GameMain />;
    }
};

export default Game;
