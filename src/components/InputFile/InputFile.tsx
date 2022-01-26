import React from 'react';
import { GoTrashcan } from "react-icons/go"
import style from "./style.module.css"

function InputFile() {
  return (
    <div id={style.inputFile}>
        <div className={style.inputFile}>
            <input type="text" placeholder="Name"/>
            <input type="file" placeholder="File"/>
            <GoTrashcan/>
        </div>
    </div>
  )
}

export default InputFile;
