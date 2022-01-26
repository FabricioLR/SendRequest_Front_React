import { useState } from "react";
import { GrAdd } from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux";
import { BodyTypes, Body, BodyState } from "../../storage/ducks/body/types";
import { GoTrashcan } from "react-icons/go"
import style from "./style.module.css"

interface StateProps {
    body: {
        data: Body[]
    }
}

function InputBody() {
    const state = useSelector<StateProps>(state => state.body) as BodyState
    const dispatch = useDispatch()
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")

    function Add(){
        if (key !== "" && value !== ""){
            dispatch({ type: BodyTypes.ADD_KEY, key, value})
            const key_: HTMLInputElement = document.getElementById("keyBody") as any
            key_.value = ""
            setKey("")
            const value_: HTMLInputElement = document.getElementById("valueBody") as any
            value_.value = ""
            setValue("")
        }
    }

    function Remove(index: number){
        dispatch({ type: BodyTypes.REMOVE_KEY, index})
    }

    return (
        <div id={style.inputBody}>
            <div className={style.inputBody}>
                <input id="keyBody" type="text" placeholder="Key" onChange={(e) => setKey(e.target.value)}/>
                <input id="valueBody" type="text" placeholder="Value" onChange={(e) => setValue(e.target.value)}/>
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

export default InputBody;
