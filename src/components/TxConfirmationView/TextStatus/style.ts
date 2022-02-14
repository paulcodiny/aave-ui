import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TextStatus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &__text {
      font-size: $regular;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
    }

    .DefaultButton.TextStatus__button {
      width: 120px;
      min-height: 32px;
      font-size: $medium;
      @include respond-to(xl) {
      }
    }
  }
`;

export default staticStyles;
