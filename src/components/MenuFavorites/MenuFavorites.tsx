import React from 'react';
import { useSelector } from 'react-redux';
import { Favorite } from "../../storage/ducks/favorites/types"
import style from "./style.module.css"

type StateProps = {
    favorites: {
        data: Favorite[]
    }
}

type MenuFavoritesProps = {
    LoadFavorite: Function
}

function MenuFavorites(props: MenuFavoritesProps) {
    const state = useSelector<StateProps>(state => state) as StateProps

    return (
        <div id={style.menuFavorites}>
            <ul>
                {state.favorites.data.map((value) => <li key={value.id} onClick={() => props.LoadFavorite(value.id)}><p>{value.metodo}</p><p>{value.url}</p></li>)}
            </ul>
        </div>
    )
}

export default MenuFavorites;
