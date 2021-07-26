import "./MainHeader.css";

function MainHeader({pageTitle}) {
  return (
    <header id="mainHeader">
      <div>{pageTitle}</div>
      {
        // pageTitle === "#Explore" ? <input/> : null
      }
    </header>
  )
}

export default MainHeader;