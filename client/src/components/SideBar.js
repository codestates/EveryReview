import { Link } from 'react-router-dom';
import './SideBar.css';

function SideBar() {
  return (
    <section className="sideBar">
      <div className="sideBarLogoWrap">
        <div className="sideBarLogo">
          <img src="#" alt="BI" />
        </div>
      </div>
      <ul className="sideBarMenu">
        <li className="sideBarMenu-li">
          <Link to='/main/home'>Home</Link>
        </li>
        <li className="sideBarMenu-li">
          <Link to='/main/explore'>#Explore</Link>
        </li>
        <li className="sideBarMenu-li">
          <Link to='/main/mypage'>My Page</Link>
        </li>
      </ul>
      <div className="logoutBtnWrap">
        <button>로그아웃</button>
      </div>
    </section>
  );
}
    
export default SideBar;  
  
// Side bar입니다.