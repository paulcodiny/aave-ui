import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .PercentBlock__no-value,
  .PercentBlock__value .ValuePercent__value {
    font-size: $large;
    margin-top: 5px;
    font-weight: 600;
    @include respond-to(xl) {
    }
    @include respond-to(lg) {
    }
    @include respond-to(md) {
      font-size: $small;
    }
    @include respond-to(sm) {
      font-size: $regular;
    }
  }
`;

export default staticStyles;
