
const Header = ({ 
  title,
  isTrue,
  onButtonPress,
}) => {
  return <header>
    <h1>{title}</h1>
    {
      isTrue ? <h2>IT's TRUE</h2> : <span>its not</span>
    }
    <button onClick={onButtonPress}>PRESS</button>
  </header>
}

export default Header;