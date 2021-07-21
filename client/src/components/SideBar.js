
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <ul className="sidebar">
      <li>
        <Link to='/main/home'>Home</Link>
      </li>
      <li>
        <Link to='/main/explore'>Explore</Link>
      </li>
      <li>
        <Link to='/main/mypage'>mypage</Link>
      </li>
    </ul>
  );
}
    
export default SideBar;  
  
// Side bar입니다.