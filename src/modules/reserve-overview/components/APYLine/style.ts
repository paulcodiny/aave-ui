import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Row.APYLine {
    margin-bottom: 8px;
    @include respond-to(lg) {
    }
    @include respond-to(md) {
      margin-bottom: 8px;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
    &.Row .Row__title,
    .APYLine__percent .ValuePercent__value {
      font-size: $small;
      font-family: 'roboto-font';
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
    .APYLine__percent .ValuePercent__value {
      font-weight: 600;
    }
  }
`;

export default staticStyles;
