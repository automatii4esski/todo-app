import { MyFC } from '../../types/common';
import HeaderService from './UserService';

const Header: MyFC = () => {
  return (
    <header className="header">
      <p className="header__greet">{`Welcome back, Ivan 👋`}</p>
      <HeaderService />
    </header>
  );
};

export default Header;
