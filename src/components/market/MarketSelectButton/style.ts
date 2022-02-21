import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MarketSelectButton {
    border-radius: $borderRadius;
    position: relative;
    &:hover {
      .MarketSelectButton__border {
        animation: none;
      }
    }
    &:disabled {
      box-shadow: none !important;
      .MarketSelectButton__border {
        animation: none;
      }
      &:hover {
        .MarketSelectButton__inner {
          border: 1px solid transparent !important;
          box-shadow: $boxShadow !important;
        }
      }
    }

    &.MarketSelectButton__active {
      &:hover {
        .MarketSelectButton__inner {
          box-shadow: $boxShadow !important;
        }
      }
    }

    &__logo-inner {
      display: flex;
      align-items: center;
      position: relative;
      span {
        position: relative;
        right: 5px;
        margin-right: 5px;
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
      }

      img {
        width: 65px;
        max-height: 23px;
        display: flex;
        align-items: center;
        justify-content: center;
        @include respond-to(xl) {
        }
        @include respond-to(sm) {
          width: 100px;
          max-height: 23px;
        }
      }
    }

    .MarketSelectButton__subLogo {
      height: 25px;
      @include respond-to(xl) {
      }
      @include respond-to(sm) {
        height: 45px;
      }
    }

    &__inner {
      position: relative;
      z-index: 2;
      width: 125px;
      height: 40px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: center;
      padding: 5px;
      border-radius: 5px;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      transition: $transition;
      box-sizing: unset;
      @include respond-to(xl) {
      }
      @include respond-to(sm) {
        width: 150px;
        height: 45px;
      }
    }

    &__innerLeft {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    &__border {
      position: absolute;
      border-radius: $borderRadius;
      transition: $transition;
      background-size: 300% !important;
      top: -2px;
      bottom: -2px;
      left: -2px;
      right: -2px;
    }

    .MarketSelectButton__marketText {
      font-size: $extraSmall;
      position: relative;
      font-weight: 300;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $extraSmall;
      }
    }

    &__kovan {
      background: #8f65ff;
      color: #ffffff;
      position: absolute;
      width: 14px;
      height: 14px;
      top: 5px;
      right: 5px;
      font-size: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      z-index: 10;
      @include respond-to(xl) {
        width: 12px;
        height: 12px;
        top: 3px;
        right: 3px;
        font-size: 8px;
      }
      @include respond-to(sm) {
        width: 14px;
        height: 14px;
        top: 5px;
        right: 5px;
        font-size: 9px;
      }
    }
  }
`;

export default staticStyles;
