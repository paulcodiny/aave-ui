import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .InterestRateButton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 25px;
    @include respond-to(xl) {
    }
    @include respond-to(lg) {
    }
    @include respond-to(md) {
    }
    @include respond-to(sm) {
      margin: 0 15px;
    }
    &:disabled {
      cursor: not-allowed;
      .InterestRateButton__image-inner,
      .InterestRateButton__description-inner {
        opacity: 0.2;
      }
    }

    &__inner {
      position: relative;
      z-index: 2;
      border-radius: $borderRadius;
      width: 160px;
      height: 170px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
    }
    &__image-inner {
      margin-bottom: 20px;
      img {
        width: 50px;
        height: 50px;
        @include respond-to(xl) {
          width: 40px;
          height: 40px;
        }
      }
    }
    &__description-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    &__description {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .InterestRateButton__percent {
      .ValuePercent__value {
        display: flex;
        align-items: center;
      }
    }
  }

  .InterestRateButtonActive {
    &:disabled {
      cursor: default;
      .InterestRateButton__image-inner,
      .InterestRateButton__description-inner {
        opacity: 1;
      }
    }
  }
`;

export default staticStyles;
