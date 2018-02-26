/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@shopgate/pwa-common/components/Grid';
import Ripple from 'Components/Ripple';
import connect from './connector';
import styles from './style';

/**
 * The Item component.
 */
class Item extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    close: PropTypes.func,
    count: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    href: PropTypes.string,
    icon: PropTypes.func,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    withIndicator: PropTypes.bool,
  };

  static defaultProps = {
    close: () => { },
    count: null,
    href: '',
    icon: null,
    onClick: () => { },
    primary: false,
    withIndicator: false,
  };

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * Returns a translated label.
   */
  get label() {
    const { __ } = this.context.i18n();
    return __(this.props.label);
  }
  /**
 * Handles an Item click by executing it's href.
 * @param {Object} props The component props.
 */
  handleClick = () => {
    // Perform onClick callback
    this.props.onClick();

    if (this.props.href) {
      this.props.navigate(this.props.href, { title: this.label });
    }

    // Call close callback from drawer
    this.props.close();
  };

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const className = classNames((
      styles.container, {
        [styles.primary]: this.props.primary,
      }
    ));

    const labelClassName =
      this.props.withIndicator && !this.props.count ? styles.labelWithIndicator : styles.label;

    return (
      <div
        aria-hidden
        className={className}
        data-test-id="NavDrawerLink"
      >
        <Ripple fill onComplete={this.handleClick}>
          <Grid className={styles.grid}>
            <Grid.Item>
              <div className={styles.icon}>
                {this.props.icon && React.createElement(
                  this.props.icon,
                  {
                    ...this.props.primary && { className: styles.primaryIcon },
                  }
                )}
              </div>
            </Grid.Item>
            <Grid.Item grow={1}>
              <div className={labelClassName}>
                {this.label}
              </div>
            </Grid.Item>
            {this.props.count && (
              <Grid.Item>
                <div className={styles.count}>
                  {this.props.count}
                </div>
              </Grid.Item>
            )}
          </Grid>
        </Ripple>
      </div>
    );
  }
}

export default connect(Item);
