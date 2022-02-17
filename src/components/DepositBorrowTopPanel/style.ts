import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DepositBorrowTopPanel {
    &__top-info {
      flex-direction: row;
      gap: 30px;
      display: flex;

      @include respond-to(md) {
        flex-direction: column;
      }
    }

    &__left-info {
      display: flex;
      flex-direction: column;
      width: 50%;
    }

    &__right-info {
      width: 50%;
      min-width: 550px;
    }

    &__left-info,
    &__right-info {
      @include respond-to(md) {
        width: 100%;
      }
    }

    &__topPanel {
      margin-bottom: 30px;
      @include respond-to(xl) {
        margin-bottom: 20px;
      }
      @include respond-to(lg) {
        margin-bottom: 10px;
      }
      @include respond-to(md) {
        margin-bottom: 30px;
      }
    }
    &__topPanelTransparent {
      background: transparent !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    &__topPanel-caption {
      display: flex;
      justify-content: space-between;
      p {
        font-size: $large;
        display: flex;
        flex-direction: column;
        border-top-right-radius: $borderRadius;
        border-top-left-radius: $borderRadius;
        @include respond-to(xl) {
        }
        @include respond-to(lg) {
        }
        @include respond-to(md) {
        }
        i {
          font-style: normal;
          display: inline-block;
          padding: 10px 0 10px 20px;
          @include respond-to(md) {
            padding: 10px 0 10px 10px;
          }
        }

        &.DepositBorrowTopPanel__topPanelCaptionFull {
          width: 100%;
        }
      }
    }

    &__topPanel-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    &__topPanelInfoCollapse {
      .DepositBorrowTopPanel__topPanel-inner {
        padding: 10px 20px;
        @include respond-to(md) {
          padding: 10px;
        }
      }
      .DepositBorrowTopPanel__topPanel-depositValues {
        flex-direction: row;
      }
    }
    &__topPanelNoUser {
      padding: 20px;
    }

    &__topPanel-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom-right-radius: $borderRadius;
      border-bottom-left-radius: $borderRadius;
      transition: $transition;
      padding: 35px 30px;
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
    }

    &__deposit-top-panel {
      height: 100%;
    }

    &__topPanelInnerFull {
      width: 100% !important;
    }

    &__topPanel-values {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-width: 225px;
      .Row {
        margin-right: 60px;
        @include respond-to(xl) {
          margin-right: 40px;
        }
      }
    }
    &__topPanelValuesCollapse {
      flex-direction: row;
    }
    &__topPanel-valuesInner {
      display: flex;
      margin-bottom: 15px;
      @include respond-to(xl) {
      }
      &:last-of-type {
        align-items: center;
      }
      .Row {
        width: 50%;
        margin-right: 0;
      }
    }
    &__topPanelValuesInnerCollapse {
      margin-bottom: 0;
      flex-wrap: wrap;
      .Row {
        width: auto;
        margin-right: 60px;
        @include respond-to(xl) {
          margin-right: 40px;
        }
      }
      &:last-of-type {
        flex: 1;
        align-items: center;
        justify-content: flex-end;
        @include respond-to(md) {
          display: none;
        }
      }
    }
    .DepositBorrowTopPanel__buttonCollapse {
      width: 120px;
      min-height: 36px;
      font-size: $medium;
      @include respond-to(xl) {
        width: 70px;
        min-height: 24px;
        font-size: $extraSmall;
      }
    }

    &__topPanel-bars {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include respond-to(md) {
      }
      .CircleCompositionBar {
        @include respond-to(xl) {
        }
        @include respond-to(md) {
          margin-left: 0;
        }

        &:first-of-type {
          margin-left: 0;
        }
      }
    }

    .Row.Row__column {
      .Row__title {
        font-size: $small;
        white-space: nowrap;
      }

      .Value__value,
      .Value__symbol,
      .ValuePercent__value,
      .ValuePercent__value span,
      .ValueWithSmallDecimals,
      .TokenIcon__dollar {
        font-size: $regular;
        font-weight: 600 !important;
      }

      .Row__title-inner {
        text-align: left;
      }
      .Row__content,
      .Value {
        align-items: flex-start;
        justify-content: flex-start;
      }
      .Row__content {
        text-align: left;
      }
    }
    .HealthFactor__column {
      text-align: left;
      .HealthFactor__percent {
        justify-content: flex-start;
      }
      .HealthFactor__no-value {
        text-align: left;
        justify-content: flex-start;
      }
    }
  }
`;

export default staticStyles;
