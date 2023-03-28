import "./result.css"
import {useGlobalContext} from "../../hooks/useGlobalContext";
import {parser} from "../../scripts/parser";
import {useEffect, useRef, useState} from "react";

export const Result = () => {
    const state = useGlobalContext()
    const [delimiters, setDelimiters] = useState([":", "\t"])

    const chooseDelimiters = useRef()

    const setDelimiter = (e) => {
        console.log(e)
        if (e.target.className === "delimiter") {
            console.log(e.target.firstChild.textContent)
            e.target.className = "delimiter-active"
        } else if (e.target.className === "delimiter-active"){
            e.target.className = "delimiter"
        }
        let delimitersArray = []
        for (let i = 0; i < chooseDelimiters.current.children.length; i++){
            if(chooseDelimiters.current.children[i].className === "delimiter-active") {
                if(chooseDelimiters.current.children[i].firstChild.textContent === "Tab"){
                    delimitersArray.push("\t")
                } else if(chooseDelimiters.current.children[i].firstChild.textContent === "Space"){
                    delimitersArray.push(" ")
                } else {
                    delimitersArray.push(chooseDelimiters.current.children[i].firstChild.textContent)
                }
            }
        }
        setDelimiters(delimitersArray)
    }

    useEffect(() => {
        parser(state.data,delimiters)
    })

    return (
        <div className={"result-page"}>
            <div className={"delimiters"}>
                <span>Delimiters</span>
                <span className={"choose-delimiter"} ref={chooseDelimiters}>
                    <span className="delimiter" onClick={(e) => setDelimiter(e)}>;</span>
                    <span className="delimiter-active" onClick={(e) => setDelimiter(e)}>:</span>
                    <span className="delimiter" onClick={(e) => setDelimiter(e)}>|</span>
                    <span className="delimiter-active" onClick={(e) => setDelimiter(e)}>Tab</span>
                    <span className="delimiter" onClick={(e) => setDelimiter(e)}>Space</span>
                </span>
            </div>
            <div className={"table"}>
                <table>
                    <thead>
                    <th className={"table-header-elem"}>#</th>
                    <th className={"table-header-elem"}>Status</th>
                    <th className={"table-header-elem"}>Facebook login</th>
                    <th className={"table-header-elem"}>Facebook password</th>
                    <th className={"table-header-elem"}>Facebook token</th>
                    <th className={"table-header-elem"}>Email login</th>
                    <th className={"table-header-elem"}>Email password</th>
                    <th className={"table-header-elem"}>Cookies</th>
                    <th className={"table-header-elem"}>Notes</th>
                    </thead>
                    <tbody>
                    {state.table?.map((row, index) => {
                        return (
                            <tr className={"row"}>
                                <td className={"row-elem"}>{index}</td>
                                <td className={"row-elem"}>Waiting</td>
                                <td className={"row-elem"}>{row[0].split("").slice(0, 15).join("")}...</td>
                                <td className={"row-elem"}>{row[1].split("").slice(0, 15).join("")}...</td>
                                <td className={"row-elem"}>{row[2].split("").slice(0, 15).join("")}...</td>
                                <td className={"row-elem"}>{row[0].split("").slice(0, 15).join("")}...</td>
                                <td className={"row-elem"}>{row[1].split("").slice(0, 15).join("")}...</td>
                                <td className={"row-elem"}>{row[4].join().split("").slice(0, 15).join("")}...</td>
                                <td className={"row-elem"}>{row[3].join().split("").slice(0, 15).join("")}...</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div className={"buttons"}>
                <button className={"back"} onClick={() => {
                    state.dispatch({type: "DROP"})
                }}>&#8592; Back
                </button>
                <button className={"export"} type={"button"}>Export</button>
            </div>
        </div>
    )
}