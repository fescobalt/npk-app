import ComboBox from '../../shared/ui/combo-box/combo-box'
import style from './header.module.css'

const LC_VAR_THEME_NAME = 'theme';
const ROOT_ATTR_NAME = 'main-theme';
const DEFAULT_THEME = 'dark';
const THEMES = ['dark', 'light'];

const Header : React.FC = () => {

  document.documentElement.setAttribute(ROOT_ATTR_NAME, localStorage.getItem(LC_VAR_THEME_NAME) ?? DEFAULT_THEME);

  // It seems like select is better to use here...
  return (<div  className={style.rootContainer}>
    <div>Цитаты или список дел</div>
    <ComboBox 
      placeholder="Тема"
      onChange={e => {
        document.documentElement.setAttribute(ROOT_ATTR_NAME, e.target.value);
        localStorage.setItem(LC_VAR_THEME_NAME, e.target.value);
      }}
      defaultValue={localStorage.getItem(LC_VAR_THEME_NAME) ?? DEFAULT_THEME}
      values={THEMES}
    />
  </div>);
}

export default Header;