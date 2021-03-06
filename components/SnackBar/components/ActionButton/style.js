import { css } from 'glamor';
import colors from 'Styles/colors';

export default css({
  color: colors.accent,
  fontWeight: 500,
  flexGrow: 1,
  textTransform: 'uppercase',
  textAlign: 'right',
  padding: '7px 0',
  wordBreak: ['keep-all', 'break-word'],
  hyphens: 'auto',
  ':focus': {
    outline: 'none',
  },
});
