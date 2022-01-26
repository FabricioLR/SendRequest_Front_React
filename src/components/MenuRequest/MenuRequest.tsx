import React from 'react';
import style from "./style.module.css"

type MenuRequestProps= {
    SendRequest: Function
    setMetodo: Function
    setHost: Function
}

function MenuRequest(props: MenuRequestProps) {
    return (
        <div id={style.menuRequest}>
            <select defaultValue="POST" onChange={(e) => props.setMetodo(e.target.value)}>
                <option>POST</option>
                <option>GET</option>
                <option>PUT</option>
                <option>DELETE</option>
            </select>
            <div id={style.host}>
                <input type="text" placeholder="http://localhost:3000/" onChange={(e) => props.setHost(e.target.value)}/>
            </div>
            <div id={style.send}>
                <button onClick={() => props.SendRequest()}>Send</button>
            </div>
        </div>
    )
}

export default MenuRequest;
