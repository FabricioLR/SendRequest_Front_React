import { useState } from 'react';
import style from "./style.module.css"
import styleMenuRequest from "../../components/MenuRequest/style.module.css"
import { FaHeart } from "react-icons/fa"
import { AiOutlineMenu } from "react-icons/ai"
import { BiSave } from "react-icons/bi"
import InputHeaders from '../../components/InputHeaders/InputHeaders';
import InputBody from '../../components/InputBody/InputBody';
import InputFile from '../../components/InputFile/InputFile';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { Body, BodyTypes } from "../../storage/ducks/body/types"
import { Header, HeaderTypes } from "../../storage/ducks/header/types"
import { ResponseTypes } from '../../storage/ducks/response/types';
import ReactJson from 'react-json-view'
import MenuRequest from "../../components/MenuRequest/MenuRequest"
import { FavoriteTypes, Favorite } from '../../storage/ducks/favorites/types';
import MenuFavorites from "../../components/MenuFavorites/MenuFavorites"
import styleMenuFavorites from "../../components/MenuFavorites/style.module.css"

type StateProps = {
    header: {
        data: Body[]
    }
    body: {
        data: Header[]
    }
    response: {
        data: any
    },
    favorites: {
        data: Favorite[]
    }
}

function Home() {
    const state = useSelector<StateProps>(state => state) as StateProps
    const dispatch = useDispatch()
    const [metodo, setMetodo] = useState("POST")
    const [metodoAdicional, setMetodoAdicional] = useState("Body")
    const [host, setHost] = useState("")

    const Metodos: any = {
        "POST": ["Body", "Headers", "File"],
        "GET": ["Headers"],
        "DELETE": ["Body", "Headers", "File"],
        "PUT": ["Body", "Headers", "File"],
    }

    const InputMetodosAdicionais: any = {
        "Body": <InputBody/>,
        "Headers": <InputHeaders/>,
        "File": <InputFile/>
    }

    function SendRequest(){
        ShowMenuRequest()
        if (host !== ""){
            const headers: any = {}
            const data: any = {}
            Object.getOwnPropertyNames(headers).forEach(function (prop) {
                delete headers[prop];
            })
            Object.getOwnPropertyNames(data).forEach(function (prop) {
                delete data[prop];
            })
            state.header.data.map((value) => headers[value.key] = value.value)
            state.body.data.map((value) => data[value.key] = value.value)
            switch (metodo) {
                case "POST":
                    try {
                        axios.post(host, data, { headers })
                        .then((response) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: response.data}))
                        .catch((error) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error.response}))
                    } catch (error) {
                        dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error})
                    }
                    return
                case "GET":
                    try {
                        axios.get(host, { headers })
                        .then((response) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: response.data}))
                        .catch((error) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error.response}))
                    } catch (error) {
                        dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error})
                    }
                    return
                case "PUT":
                    try {
                        axios.put(host, data, { headers })
                        .then((response) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: response.data}))
                        .catch((error) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error.response}))
                    } catch (error) {
                        dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error})
                    }
                    return
                case "DELETE":
                    try {
                        axios.delete(host, { headers })
                        .then((response) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: response.data}))
                        .catch((error) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error.response}))
                    } catch (error) {
                        dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error})
                    }
                    return
                default:
                    return
            }
        }
    }

    function ShowMenuRequest(){
        document.getElementById(styleMenuFavorites.menuFavorites)?.classList.remove(styleMenuFavorites.active)
        document.getElementById(styleMenuRequest.menuRequest)?.classList.toggle(styleMenuRequest.active)
    }

    function Save(){
        if (host !== ""){
            dispatch({ type: FavoriteTypes.SAVE, metodo, body: state.body.data, url: host, headers: state.header.data })
        }
    }

    function ShowMenuFavorites(){
        document.getElementById(styleMenuRequest.menuRequest)?.classList.remove(styleMenuRequest.active)
        document.getElementById(styleMenuFavorites.menuFavorites)?.classList.toggle(styleMenuFavorites.active)
    }

    function LoadFavorite(id: string){
        for (const value of state.favorites.data){
            if (value.id === id){
                const host = document.querySelector("#" + style.host + " > input") as HTMLInputElement
                host.value = value.url
                const metodo = document.querySelector("#" + style.metodo + " > select") as HTMLSelectElement
                metodo.value = value.metodo
                console.log(value.body, value.headers)
                dispatch({ type: BodyTypes.CHANGE_KEYS, data: value.body})
                dispatch({ type: HeaderTypes.CHANGE_KEYS, data: value.headers})
            }
        }
    }

    return (
        <div id={style.request}>
            <div id={style.favoritos}>
                <div id={style.cabecalhoFavoritos}>
                    <p>Favorites</p>
                </div>
                <ul id={style.conteudoFavoritos}>
                    {state.favorites.data.map((value) => <li key={value.id} onClick={() => LoadFavorite(value.id)}><p>{value.metodo}</p><p>{value.url}</p></li>)}
                </ul>
            </div>
            <div id={style.sendRequest}>
                <div id={style.cabecalhoSendRequest}>
                    <div id={style.metodo}>
                        <select defaultValue="POST" onChange={(e) => setMetodo(e.target.value)}>
                            <option>POST</option>
                            <option>GET</option>
                            <option>PUT</option>
                            <option>DELETE</option>
                        </select>
                    </div>
                    <div id={style.host}>
                        <input type="text" placeholder="http://localhost:3000/" onChange={(e) => setHost(e.target.value)}/>
                    </div>
                    <div id={style.send}>
                        <button onClick={SendRequest}>Send</button>
                        <BiSave onClick={Save}/>
                    </div>
                    <div id={style.favoritosButton}>
                        <FaHeart onClick={ShowMenuFavorites}/>
                    </div>
                    <div id={style.menuRequest}>
                        <AiOutlineMenu onClick={ShowMenuRequest}/>
                    </div>
                </div>
                <MenuRequest SendRequest={SendRequest} setHost={setHost} setMetodo={setMetodo}/>
                <MenuFavorites LoadFavorite={LoadFavorite}/>
                <div id={style.adicionais}>
                    <ul id={style.metodosAdicionais}>
                        {(Metodos[metodo] as []).map((nome) => <li key={nome} id={nome} onClick={(e: any) => {
                            setMetodoAdicional(nome)
                            document.getElementById("Headers")!.style.color = "white"
                            document.getElementById("Body")!.style.color = "white"
                            document.getElementById("File")!.style.color = "white"
                            e.target.style.color = "#b3b3b3"
                        }}>{nome}</li>)}
                    </ul>
                    {InputMetodosAdicionais[metodoAdicional]}
                </div>
                <div id={style.conteudoSendRequest}>
                    <ReactJson src={state.response.data} theme="bespin" name={false}/>
                </div>
            </div>
        </div>
    )
}

export default Home;
