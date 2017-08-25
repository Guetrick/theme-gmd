import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';
import { getScrollParent } from '@shopgate/pwa-common/helpers/dom';
import styles from './style';
import connect from './connector';
import Content from './components/Content';
import Button from './components/Button';
import colors from 'Styles/colors';
import variables from 'Styles/variables';

/**
 * The Filter bar component.
 */
class FilterBar extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    isActive: false,
    isVisible: false,
  };

  /**
   * Constructs a new component instance.
   * @param {Object} props The component properties.
   * @param {Object} context The component context.
   */
  constructor(props) {
    super(props);

    this.element = null;
    this.scrollElement = null;
    this.animationFrameRequestId = 0;
    this.prevScrollTop = 0;
    this.isVisible = true;
    this.origin = 0;

    this.state = {
      offset: 0,
      hasShadow: false,
      spacerHeight: variables.filterbar.height,
    };
  }

  /**
   * Called after mount. Sets up the scroll DOM elements.
   */
  componentDidMount() {
    this.setupScrollElement();
    this.setSpacerHeight();
  }

  /**
   * Called before the component receives new properties. Sets up the scroll DOM elements.
   * @param {Object} nextProps The next component props.
   */
  componentWillReceiveProps() {
    this.setupScrollElement();
  }

  /**
   * Update the spacer height if the component updates.
   */
  componentDidUpdate() {
    this.setSpacerHeight();
  }

  /**
   * Called before the component un-mounts.
   */
  componentWillUnmount() {
    this.unbindEvents();
  }

  /**
   * Sets up the scroll DOM element and binds all event handlers.
   */
  setupScrollElement() {
    if (this.scrollElement) {
      return;
    }

    this.scrollElement = getScrollParent(this.element);

    this.bindEvents();
  }

  /**
   * If the bar is visible, the scrolling container requires a spacer element to prevent
   * overlapping of scrollable contents when scrolled up. This method calculates the
   * spacers total height.
   */
  setSpacerHeight = () => {
    if (!this.element) {
      return;
    }

    const height = this.element.offsetHeight;

    if (height > 0 && height !== this.state.spacerHeight) {
      this.setState({ spacerHeight: height });
    }
  }

  /**
   * Binds the DOM event handlers to the scroll element.
   */
  bindEvents() {
    if (!this.scrollElement) {
      return;
    }

    this.scrollElement.addEventListener('swipe', this.handleSwipe);
    this.animate();
  }

  /**
   * Unbinds the event handlers from the scroll element.
   */
  unbindEvents() {
    if (this.scrollElement) {
      this.scrollElement.removeEventListener('swipe', this.handleSwipe);
      cancelAnimationFrame(this.animationFrameRequestId);
    }
  }

  /**
   * Continuous animation of the filter bar.
   */
  animate = () => {
    const { scrollTop } = this.scrollElement;
    const elementHeight = this.element.offsetHeight;

    if (scrollTop <= elementHeight) {
      this.isVisible = true;
    }

    const delta = scrollTop - this.prevScrollTop;

    // Only update the state if the current scroll delta has changed.
    if (delta !== 0) {
      const { offset } = this.state;
      const nextOffset = this.isVisible
        ? clamp(offset - delta, -elementHeight, 0)
        : -elementHeight;

      if (delta < 0) {
        // Shift the origin if the scroll direction is upwards.
        this.origin = Math.min(scrollTop + nextOffset, this.origin);
      }

      if (nextOffset <= -elementHeight) {
        // Hide the component if it left the viewport.
        this.isVisible = false;
      }

      // Update the shadow state
      const hasShadow = (
        this.isVisible && this.origin + nextOffset > 0
      );

      // Update the state
      this.setState({
        offset: nextOffset,
        hasShadow,
      });

      this.prevScrollTop = scrollTop;
    }
    // Continuously call the animate() method.
    this.animationFrameRequestId = requestAnimationFrame(this.animate);
  };

  /**
   * Handles the swipe events.
   * @param {Object} event The swipe event as received from ViewContent.
   */
  handleSwipe = (event) => {
    if (this.isVisible) {
      return;
    }

    const { isFlick, y } = event.detail;

    if (!isFlick || y >= 0) {
      // Only react to flick events with a downward motion.
      return;
    }

    this.isVisible = true;
    this.origin = this.scrollElement.scrollTop;
  };

  /**
   * Returns the filter bar wrapper styles.
   * @returns {Object} The filter bar wrapper styles.
   */
  get wrapperStyle() {
    // Control the scrolling of the filter bar by applying a transform style property.
    return {
      background: (this.props.isActive) ? colors.accent : colors.background,
      color: (this.props.isActive) ? colors.light : 'inherit',
      transform: `translate3d(0, ${this.state.offset}px, 0)`,
    };
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <section style={{ height: this.state.spacerHeight }}>
        <div
          ref={(ref) => { this.element = ref; }}
          className={styles.wrapper}
          style={this.wrapperStyle}
        >
          <div className={this.filterBarClassName}>
            <Content componentUpdated={this.setSpacerHeight} />
          </div>
        </div>
      </section>
    );
  }
}

export default connect(FilterBar);
