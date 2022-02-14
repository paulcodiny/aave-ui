import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StakingTopPanel {
    margin-bottom: 30px;
    border-radius: $borderRadius;
    backdrop-filter: blur(10px);
    border: solid 1px rgba(255, 255, 255, 0.35);
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) -6%,
      rgba(255, 255, 255, 0.25) 58%
    );
    padding: 15px 35px;
    display: flex;
    align-items: center;
    @include respond-to(xl) {
    }
    @include respond-to(lg) {
    }
    @include respond-to(md) {
    }
    @include respond-to(sm) {
      padding: 15px 10px;
      margin-bottom: 30px;
      justify-content: space-between;
      border-radius: 0;
      position: relative;
      left: -10px;
      width: calc(100% + 20px);
      display: block;
    }

    &__caption {
      font-size: $regular;
      margin-right: 150px;
      @include respond-to(xl) {
        font-size: $medium;
        margin-right: 130px;
      }
      @include respond-to(lg) {
        font-size: $small;
        margin-right: 30px;
      }
      @include respond-to(md) {
        font-size: $medium;
        margin-right: 100px;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__values {
      display: flex;
      @include respond-to(sm) {
        width: 100%;
        justify-content: center;
      }

      .GradientLine {
        margin: 0 30px;
      }
    }

    &__value-inner {
      display: flex;
      flex-direction: column;
      @include respond-to(lg) {
      }
      @include respond-to(sm) {
        display: block;
        text-align: center;
        .Value {
          align-items: center;
        }
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
    &__value-title {
      font-weight: 400;
      margin-right: 20px;
      font-size: $regular;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
      @include respond-to(sm) {
        margin: 0 0 5px 0;
        font-size: $small;
        font-weight: 400;
      }
    }

    .Value {
      margin-top: 10px;
    }

    .Value__token-icon span,
    .Value__value,
    .Value__symbol {
      font-size: $extraExtraLarge;
      font-weight: 600;
    }
  }
`;

export default staticStyles;
