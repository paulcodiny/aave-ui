import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BasicTable {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: calc(100% + 30px);
    margin: 0 0 0 -15px;
    position: relative;
    z-index: 1;
    @include respond-to(sm) {
      flex: none;
      display: block;
      margin: 0;
      width: 100%;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex: auto;
      min-height: 250px;
      padding-top: 100px;
      margin-top: -112px;
      z-index: 2;
      @include respond-to(sm) {
        height: auto;
      }
    }

    &__content-inner {
      display: block;
      padding: 7px 15px 12px;
      @include respond-to(sm) {
        padding: 5px 5px 12px;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: 0 15px;
      height: 48px;
      padding: 0 20px 10px 20px;

      border-radius: 5px;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      border: solid 1px rgba(255, 255, 255, 0.2);
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) -6%,
        rgba(255, 255, 255, 0.3) 59%
      );

      @include respond-to(xl) {
        margin: 0 15px;
      }
      @include respond-to(lg) {
        margin: 0 15px;
      }
      @include respond-to(sm) {
        margin: 0 5px;
      }
    }
  }
`;

export default staticStyles;
