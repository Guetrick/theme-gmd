import React from 'react';
import PropTypes from 'prop-types';
import { INDEX_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import connect from './connector';
import Logo from './components/Logo';
import Title from './components/Title';
import Search from './components/Search';

/**
 * The navigator content component.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const Content = (props) => {
  let currentTitle = null;

  if (!props.searchActive) {
    if (props.path === INDEX_PATH) {
      currentTitle = <Logo />;
    } else {
      const isSearching = props.getQueryParam('s') !== undefined;

      currentTitle = <Title onClick={isSearching ? props.submitSearch : null} />;
    }
  }

  return (
    <div>
      {currentTitle}
      <Search active={props.searchActive} />
    </div>
  );
};

Content.propTypes = {
  getQueryParam: PropTypes.func.isRequired,
  submitSearch: PropTypes.func.isRequired,
  path: PropTypes.string,
  searchActive: PropTypes.bool,
};

Content.defaultProps = {
  path: null,
  searchActive: false,
};

export default connect(Content);
