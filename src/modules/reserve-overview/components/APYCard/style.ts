import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .APYCard {
    width: 200px;
    @include respond-to(xl) {
    }
    @include respond-to(lg) {
    }
    @include respond-to(md) {
      width: 200px;
      margin: 0 15px;
    }
    @include respond-to(sm) {
      width: 100%;
      margin: 0 0 15px;
    }

    &__title {
      p {
        font-size: $regular;
        font-weight: 600;
        @include respond-to(xl) {
          font-size: $regular;
        }
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }

    &__content {
      margin-top: 10px;
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
    }
  }
`;

export default staticStyles;
