import "./MainHeader.css";
import home from '../static/home.png'
import explore from '../static/explore.png'
import mypage from '../static/mypage.png'

function MainHeader({pageTitle}) {
  return (
    <>
      <header id="mainHeader">
        <div className='pageTitle'>{pageTitle}</div>
        {
          // pageTitle === "#Explore" ? <input/> : null
        }
        <div className='headerImgWrap'>
          <img
            className='headerImg'
            src={home} 
            alt='home header image'
          />
          <img
            className='headerImg'
            src={explore} 
            alt='explore header image'
          />
          <img
            className='headerImg'
            src={mypage} 
            alt='mypage header image'
          />
        </div>
      </header>
    </>
  )
}

export default MainHeader;