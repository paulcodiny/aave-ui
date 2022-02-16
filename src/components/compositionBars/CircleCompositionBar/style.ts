import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CircleCompositionBar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    position: relative;
    @include respond-to(xl) {
    }
    @include respond-to(lg) {
    }
    @include respond-to(md) {
    }

    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      left: 11%;
      right: 11%;
      top: 11%;
      bottom: 11%;
      border-radius: 50%;
      z-index: 2;
      position: absolute;

      p {
        font-size: $large;
        font-weight: 300;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
      }
    }
  }
`;

export default staticStyles;
