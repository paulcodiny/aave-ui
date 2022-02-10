import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ContentWrapperWithTopLine {
    &__withDropdown {
      .ContentWrapperWithTopLine__top-line {
        cursor: pointer;
      }
      .ContentWrapperWithTopLine__content {
        display: none;
      }
      .ContentWrapperWithTopLine__contentActive {
        display: block;
      }
    }

    &__top-line {
      padding: 15px 0;
      font-size: $large;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      min-height: 49px;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
      @include respond-to(sm) {
        padding: 10px;
        font-size: $regular;
        min-height: 39px;
      }
    }

    &__arrow-inner {
      display: flex;
      align-items: center;
      font-size: $medium;
      span {
        margin-right: 5px;
      }
    }

    &__content {
      border-radius: $borderRadius;
      backdrop-filter: blur(10px);
      border: solid 1px rgba(255, 255, 255, 0.35);
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) -6%,
        rgba(255, 255, 255, 0.25) 58%
      );
    }
  }
`;

export default staticStyles;
