import "./fileInput.css"
import upload from "../../../media/upload.png";
import file_image from "../../../media/file.png";
import {useRef, useState} from "react";
import {parser} from "../../../scripts/parser";
import {useGlobalContext} from "../../../hooks/useGlobalContext";

export const FileInput = (props) => {
    const [file, setFile] = useState()
    const file_input = useRef()
    const state = useGlobalContext()

    const uploadFile = (event) => {
        props.setTextInputActive(false)
        setFile(event.target.files[0])
    }

    const handleFile = (e) => {
        const content = e.target.result;
        state.dispatch({type: "SET-TABLE", payload: parser(content, [":", "\t"])})
        state.dispatch({type: "SET-DATA", payload: content})
    }

    const readFile = (file) => {
        const reader = new FileReader()
        reader.onload = handleFile;
        reader.readAsText(file)
    }

    return (
        <div className={"file-input"}>
            <input ref={file_input} type="file"
                   accept='.csv'
                   accept='.txt'
                   onChange={(e) => {
                uploadFile(e)
            }}/>
            <div className={"information"}>
                { !file ?
                    <>
                        <img className={"upload"} src={upload} alt=""/>
                        <div className={'file-types'}>txt, csv</div>
                        <div className={"description"}><label className={"choose"}>Chose a file</label> or drag it here</div>
                    </>
                :
                    <>
                        <img className={"file-image"} src={file_image} alt=""/>
                        <div className={'description'}>File name {file.name}</div>
                        <button className={"parse"} type={"button"} onClick={() => {readFile(file)}}>Parse</button>
                        <div className={"cancel"} onClick={() => {
                            file_input.current.value = ''
                            setFile(file_input.current.value)
                            props.setTextInputActive(true)
                        }}>Cancel</div>
                    </>
                }
            </div>
        </div>
    )
}