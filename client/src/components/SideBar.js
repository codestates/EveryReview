import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo';
import './SideBar.css';

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
          <Link to='/main/home'>HOME</Link>
        </li>
        <li>
          <Link to='/main/explore'>#Explore</Link>
        </li>
        <li>
          <Link to='/main/mypage'>My Page</Link>
        </li>
      </ul>
      <div id="logoutBtnWrap">
        <button onClick={handleLogout} >로그아웃</button>
      </div>
    </section>
  );
}
    
export default SideBar;  
  
// Side bar입니다.