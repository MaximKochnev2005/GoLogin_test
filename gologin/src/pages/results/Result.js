import "./result.css"
import {useGlobalContext} from "../../hooks/useGlobalContext";
import {parser} from "../../scripts/parser";

export const Result = () => {
    const state = useGlobalContext()

    console.log(state.table)

    return (
        <div className={"result-page"}>
            <div className={"delimiters"}>
                <span>Delimiters</span>
                <span className={"choose-delimiter"}>
                    <span className="delimiter">;</span>
                    <span className="delimiter-active">:</span>
                    <span className="delimiter">|</span>
                    <span className="delimiter-active">Tab</span>
                    <span className="delimiter">Space</span>
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
                            console.log(row)
                            let note = row.slice(4,6)
                            note.push(row[0])
                            let ids = row.slice(7, 17)
                            note = note.concat(ids)
                            let cookies = 1
                            return (
                                <tr className={"row"}>
                                    <td className={"row-elem"}>{index}</td>
                                    <td className={"row-elem"}>Waiting</td>
                                    <td className={"row-elem"}>{row[1].split("").slice(0, 15).join("")}...</td>
                                    <td className={"row-elem"}>{row[2]}</td>
                                    <td className={"row-elem"}>{row[3].split("").slice(0, 15).join("")}...</td>
                                    <td className={"row-elem"}>{row[1].split("").slice(0, 15).join("")}...</td>
                                    <td className={"row-elem"}>{row[2]}</td>
                                    <td className={"row-elem"}>{cookies}</td>
                                    <td className={"row-elem"}>{note.join("").split("").slice(0, 15).join("")}...</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className={"buttons"}>
                    <button className={"back"} onClick={() => {
                        state.dispatch({type: "DROP"})
                    }}>&#8592; Back</button>
                    <button className={"export"} type={"button"} >Export</button>
            </div>
        </div>
    )
}