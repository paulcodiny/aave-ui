import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReserveStatusGraph {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    @include respond-to(sm) {
      order: 0;
    }

    &__inner {
      position: relative;
      width: 160px;
      z-index: 2;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
      @include respond-to(sm) {
        width: 270px;
        margin-bottom: 10px;
      }

      > div {
        &:first-of-type {
          min-height: 164.083px !important;
          height: 164.083px !important;
          @include respond-to(xl) {
          }
          @include respond-to(lg) {
          }
          @include respond-to(md) {
            min-height: 164.083px !important;
            height: 164.083px !important;
          }
          @include respond-to(sm) {
            min-height: 205.75px !important;
            height: 205.75px !important;
          }
        }
      }
    }

    .ReserveStatusGraph__icon {
      position: absolute;
      top: 49%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        margin-right: 0 !important;
      }

      .MultipleIcons {
        margin-right: 0 !important;
      }
    }
  }
`;

export default staticStyles;
