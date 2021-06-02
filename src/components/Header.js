import headerLogo from '../images/mesto-logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Лого Место" />
        </header>
    )
}

export default Header