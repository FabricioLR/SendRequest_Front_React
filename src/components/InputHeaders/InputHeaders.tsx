import React, { useState } from 'react';
import { GrAdd } from "react-icons/gr"
import { GoTrashcan } from "react-icons/go"
import { useDispatch, useSelector } from 'react-redux';
import style from "./style.module.css"
import { Header, HeaderState, HeaderTypes } from "../../storage/ducks/header/types"

interface StateProps {
    header: {
        data: Header[]
    }
}

function InputHeaders() {
    const state = useSelector<StateProps>(state => state.header) as HeaderState
    const dispatch = useDispatch()
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")

    function Add(){
        if (key !== "" && value !== ""){
            dispatch({ type: HeaderTypes.ADD_KEY, key, value})
            const key_: HTMLInputElement = document.getElementById("keyHeader") as any
            key_.value = ""
            setKey("")
            const value_: HTMLInputElement = document.getElementById("valueHeader") as any
            value_.value = ""
            setValue("")
        }
    }

    function Remove(index: number){
        dispatch({ type: HeaderTypes.REMOVE_KEY, index })
    }

    return (
        <div id={style.inputHeaders}>
            <div className={style.inputHeaders}>
                <input id="keyHeader" type="text" placeholder="Key" onChange={(e) => setKey(e.target.value)}/>
                <input id="valueHeader" type="text" placeholder="Value" onChange={(e) => setValue(e.target.value)}/>
                <GrAdd onClick={Add}/>
            </div>
            {state.data.map((value, index) => (
                <div key={index} className={style.key_value}>
                    <p>{value.key}</p>
                    <p>{value.value}</p>
                    <GoTrashcan onClick={() => Remove(index)}/>
                </div>
            ))}
        </div>
    )
}

export default InputHeaders;
