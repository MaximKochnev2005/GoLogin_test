import "./logo.css"
import logo from "../..//media/logo.png"

export const Logo = () => {
  return (
      <div className={"header"}>
          <img src={logo} alt=""/>
          <div className={"logo-text"}>GOLOGIN</div>
      </div>
  )
}