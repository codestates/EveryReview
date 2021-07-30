import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import BI from '../static/BI.png'
import './SideBar.css';
import { FaRegCompass } from 'react-icons/fa'
import { FiHome } from 'react-icons/fi'
import { CgUserlane } from 'react-icons/cg'

function SideBar({ setUserInfo, setIsLogin }) {
  const history = useHistory();

  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_END_POINT}/signout`, {
        withCredentials: true
      })
      .then((res) => {
        history.push("/login");
        setUserInfo({});
        setIsLogin(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <section id="sideBar">
      <div>
        <img
          className='sidebarLogo'
          alt='EveryReview BI'
          src={BI}
        />
      </div>
      <ul id="sideBarMenu">
        <li>
          <Link to='/main/home'>
            <FiHome className='sidebarIcon' />HOME
          </Link>
        </li>
        <li>
          <Link to='/main/explore'>
            <FaRegCompass className='sidebarIcon' />
            #Explore
          </Link>
        </li>
        <li>
          <Link to='/main/mypage' className='sidebarLink'>
            <CgUserlane className='sidebarIcon' />
            My Page
          </Link>
        </li>
      </ul>
      <button id='btnLogout' onClick={handleLogout} >로그아웃</button>
    </section>
  );
}

export default SideBar;

// Side bar입니다.