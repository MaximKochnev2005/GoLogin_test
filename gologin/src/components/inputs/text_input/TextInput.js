import "./textInput.css"
import {useEffect, useRef, useState} from "react";
import {useGlobalContext} from "../../../hooks/useGlobalContext";
import {parser} from "../../../scripts/parser";

export const TextInput = (props) => {
    const [text, setText] = useState('');
    const state = useGlobalContext();
    const input = useRef();

    useEffect(() => {
        if (text.length >= 2) {
            props.setFileInputActive(false);
            input.current.style.height = "583px";
        } else {
            props.setFileInputActive(true);
            input.current.style.height = "200px";
        }
    })

    return (
        <div className={"text-input"}>
            <textarea placeholder={"Enter or paste data from stores"}
                      onChange={e => setText(e.target.value)}
                      value={text}
                      ref={input}
            />
            {text.length >= 2 && <div className={"buttons"}>

                <button className={"back"} onClick={() => {
                    setText('');
                }
                }>
                    &#8592; Back
                </button>
                <button className={"parse"} type={"button"} onClick={() => {
                    state.dispatch({type: "SET-TABLE", payload: parser(text, [":", "\t"])});
                    state.dispatch({type: "SET-DATA", payload: text});
                }}>Parse
                </button>
            </div>}

        </div>
    )
}