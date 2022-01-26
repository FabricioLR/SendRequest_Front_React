import React, { useState, useEffect } from 'react';
import style from "./style.module.css"
import styleMenuRequest from "../../components/MenuRequest/style.module.css"
import { GrAdd } from "react-icons/gr"
import { FaHeart } from "react-icons/fa"
import { AiOutlineMenu } from "react-icons/ai"
import InputHeaders from '../../components/InputHeaders/InputHeaders';
import InputBody from '../../components/InputBody/InputBody';
import InputFile from '../../components/InputFile/InputFile';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { Body } from "../../storage/ducks/body/types"
import { Header } from "../../storage/ducks/header/types"
import { ResponseTypes } from '../../storage/ducks/response/types';
import ReactJson from 'react-json-view'
import MenuRequest from "../../components/MenuRequest/MenuRequest"

type StateProps = {
    header: {
        data: Body[]
    }
    body: {
        data: Header[]
    }
    response: {
        data: any
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
            switch (metodo) {
                case "POST":
                    Object.getOwnPropertyNames(headers).forEach(function (prop) {
                        delete headers[prop];
                    })
                    Object.getOwnPropertyNames(data).forEach(function (prop) {
                        delete data[prop];
                    })
                    state.header.data.map((value) => headers[value.key] = value.value)
                    state.body.data.map((value) => data[value.key] = value.value)

                    console.log(headers, data)

                    axios.post(host, data, { headers })
                    .then((response) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: response.data}))
                    .catch((error) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error.response}))
                    return
                case "GET":
                    Object.getOwnPropertyNames(headers).forEach(function (prop) {
                        delete headers[prop];
                    })
                    Object.getOwnPropertyNames(data).forEach(function (prop) {
                        delete data[prop];
                    })
                    state.header.data.map((value) => headers[value.key] = value.value)

                    axios.get(host, { headers })
                    .then((response) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: response.data}))
                    .catch((error) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error.response}))
                    return
                case "PUT":
                    Object.getOwnPropertyNames(headers).forEach(function (prop) {
                        delete headers[prop];
                    })
                    Object.getOwnPropertyNames(data).forEach(function (prop) {
                        delete data[prop];
                    })
                    state.header.data.map((value) => headers[value.key] = value.value)
                    state.body.data.map((value) => data[value.key] = value.value)

                    axios.put(host, data, { headers })
                    .then((response) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: response.data}))
                    .catch((error) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error.response}))
                    return
                case "DELETE":
                    Object.getOwnPropertyNames(headers).forEach(function (prop) {
                        delete headers[prop];
                    })
                    Object.getOwnPropertyNames(data).forEach(function (prop) {
                        delete data[prop];
                    })
                    state.header.data.map((value) => headers[value.key] = value.value)
                    state.body.data.map((value) => data[value.key] = value.value)

                    axios.delete(host, { headers })
                    .then((response) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: response.data}))
                    .catch((error) => dispatch({ type: ResponseTypes.ADD_RESPONSE, data: error.response}))
                    return
                default:
                    return
            }
        }
    }

    function ShowMenuRequest(){
        document.getElementById(styleMenuRequest.menuRequest)?.classList.toggle(styleMenuRequest.active)
    }

    return (
        <div id={style.request}>
            <div id={style.favoritos}>
                <div id={style.cabecalhoFavoritos}>
                    <p>Favoritos</p>
                    <GrAdd/>
                </div>
                <div id={style.conteudoFavoritos}>
                    
                </div>
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
                    </div>
                    <div id={style.favoritosButton}>
                        <FaHeart/>
                    </div>
                    <div id={style.menuRequest}>
                        <AiOutlineMenu onClick={ShowMenuRequest}/>
                    </div>
                </div>
                <MenuRequest SendRequest={SendRequest} setHost={setHost} setMetodo={setMetodo}/>
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
