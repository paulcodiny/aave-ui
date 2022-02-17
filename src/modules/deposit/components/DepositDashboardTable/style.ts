import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableItem {
    .ValuePercent__value,
    .ValuePercent__value span,
    .Value__token-icon,
    .Value__value,
    .Value__symbol {
      font-size: $medium !important;
    }
  }
`;

export default staticStyles;
