import { useContext } from "react";
import { DataContext } from "../context/GameData";

const Header = () => {

    const { characters } = useContext(DataContext);

    return (
        <div className="header">
            <div className="header__character-picker"></div>
        </div>
    )
}

export default Header;