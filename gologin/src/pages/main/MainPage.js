import "./main.css"
import {FileInput} from "../../components/inputs/file_input/FileInput";
import {TextInput} from "../../components/inputs/text_input/TextInput";
import {useState} from "react";

export const MainPage = () => {
    const [fileInputActive, setFileInputActive] = useState(true)
    const [textInputActive, setTextInputActive] = useState(true)
    return (
        <div>
            {fileInputActive && <FileInput setTextInputActive={setTextInputActive}/>}
            {textInputActive && <TextInput setFileInputActive={setFileInputActive}/>}
        </div>
    )
}