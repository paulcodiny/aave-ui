import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .RiskBar {
    margin: 25px auto 0;
    width: 335px;
    position: relative;
    @include respond-to(lg) {
      width: 260px;
    }
    @include respond-to(md) {
      width: 335px;
    }

    &__top-inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2px;
      min-height: 16px;
    }
    &__title {
      font-size: $extraSmall;
    }

    &__newHF {
      display: flex;
      align-items: center;
      p,
      .ValuePercent .ValuePercent__value {
        font-size: $small;
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
      }
      .ValuePercent {
        margin-left: 5px;
      }
    }

    &__range-inner {
      margin-top: 7px;
      width: 100%;
      border-radius: 10px;
      background-image: linear-gradient(to left, #ff59a4, #ffc64e 55%, #3cecd1 100%);
    }

    .RiskBar__track {
      height: 14px;
      width: calc(100% - 14px);
      margin: 0 auto;
      border-radius: 10px;
    }

    .RiskBar__thumb {
      width: 28px;
      height: 28px;
      border-radius: 28px;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.3);
      outline: none !important;
    }
  }
`;

export default staticStyles;
