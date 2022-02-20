import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Table__column {
    p {
      color: #7f7f7f;
      font-size: $small;
      margin-top: 5px;
    }

    &:first-of-type {
      width: 270px;
    }
  }
`;

export default staticStyles;
