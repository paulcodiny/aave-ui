import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TopStats {
    h3 {
      font-size: $regular;
      font-weight: 600;
      height: 55px;
    }

    span {
      font-size: 34px;
      font-weight: 600;
    }
  }
`;

export default staticStyles;
