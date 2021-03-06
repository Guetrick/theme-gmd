import { css } from 'glamor';
import colors from 'Styles/colors';

const item = css({
  marginLeft: 72,
}).toString();

const itemNotLast = css({
  boxShadow: `0 1px 0 0 ${colors.darkGray}`,
  marginBottom: 1,
}).toString();

const innerContainer = css({
  marginLeft: -72,
  minHeight: 56,
  position: 'relative',
}).toString();

const glow = css({
  bottom: -1,
  height: '100%',
  top: -1,
}).toString();

export default {
  item,
  itemNotLast,
  innerContainer,
  glow,
};
