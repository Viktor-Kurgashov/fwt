import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as FirstIcon } from './assets/first-page.svg';
import { ReactComponent as PrevIcon } from './assets/prev-page.svg';
import { ReactComponent as NextIcon } from './assets/next-page.svg';
import { ReactComponent as LastIcon } from './assets/last-page.svg';
import './style.css';

const Pagintation = ({ links }) => {
  return (
    <div className="pagination">
      {links.first
        ? <Link className="pagination__arrow-link" to={links.first.route}><FirstIcon /></Link>
        : <p className="pagination__arrow-link pagination__arrow-link--disabled"><FirstIcon /></p>
      }
      {links.prev
        ? <Link className="pagination__arrow-link" to={links.prev.route}><PrevIcon /></Link>
        : <p className="pagination__arrow-link pagination__arrow-link--disabled"><PrevIcon /></p>
      }
      {links.stack.map(item => !item.current
        ? <Link className="pagination__numbered-link" to={item.route} key={item.route}>{item.title}</Link>
        : <p className="pagination__numbered-link pagination__numbered-link--current" key={item.route}>{item.title}</p>
      )}
      {links.next
        ? <Link className="pagination__arrow-link" to={links.next.route}><NextIcon /></Link>
        : <p className="pagination__arrow-link pagination__arrow-link--disabled"><NextIcon /></p>
      }
      {links.last
        ? <Link className="pagination__arrow-link" to={links.last.route}><LastIcon /></Link>
        : <p className="pagination__arrow-link pagination__arrow-link--disabled"><LastIcon /></p>
      }
    </div>
  )
};

Pagintation.propTypes = {
  links: propTypes.object.isRequired, // объект ссылок создаётся в сторе
};

export default React.memo(Pagintation);