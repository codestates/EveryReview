import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo';
import './SideBar.css';
import { FaRegCompass } from 'react-icons/fa'
import { FiHome } from 'react-icons/fi'
import { CgUserlane } from 'react-icons/cg'

function SideBar({ setUserInfo, setIsLogin }) {
  const history = useHistory();

  const handleLogout = () => {
    axios
    .get(`${process.env.REACT_APP_END_POINT}/signout`,{
      withCredentials: true
    })
    .then((res) => {
      history.push("/login");
      setUserInfo({});
      setIsLogin(false);
    })
  }
  return (
    <section id="sideBar">
      <div id="sideBarLogoWrap">
        <Logo id="sideBarLogo"/>
      </div>
      <ul id="sideBarMenu">
        <li>
          <FiHome className='sidebarIcon'/>
          <Link to='/main/home'>HOME</Link>
        </li>
        <li>
          <FaRegCompass className='sidebarIcon' />
          <Link to='/main/explore'>#Explore</Link>
        </li>
        <li>
          <CgUserlane className='sidebarIcon' />
          <Link to='/main/mypage'>My Page</Link>
        </li>
      </ul>
      <div id="logoutBtnWrap">
        <button id='btnLogout' onClick={handleLogout} >로그아웃</button>

      </div>
    </section>
  );
}
    
export default SideBar;  
  
// Side bar입니다.