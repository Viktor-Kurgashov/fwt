import React from 'react';
import { useSelector } from 'react-redux';
import Header from './containers/header';
import Main from './containers/main';
import './styles/app.css';
import './styles/tags.css';
import './styles/styles.css';

const App = () => {
  const themeDark = useSelector(state => state.catalog.themeDark);

  return (
    <div className={themeDark ? 'app app--theme-dark' : 'app'}>
      <Header />
      <Main />
    </div>
  );
};

export default React.memo(App);