import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReserveInformation {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    max-width: calc(100% - 555px);
    @include respond-to(xl) {
      margin-right: 20px;
      max-width: calc(100% - 460px);
    }
    @include respond-to(lg) {
      max-width: calc(100% - 360px);
    }
    @include respond-to(md) {
      display: block;
      margin: 0 0 10px 0;
      max-width: 100%;
    }
    @include respond-to(sm) {
      margin: 30px 0 0 0;
      display: block;
    }

    &__title {
      font-weight: 600;
      font-size: $large;
      margin-bottom: 20px;
      @include respond-to(xl) {
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__content {
      padding: 30px 35px;
      flex: 1;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
        padding: 20px 30px;
      }
      @include respond-to(sm) {
        padding: 20px 15px;
      }
    }

    &__top-info {
      display: none;
      @include respond-to(lg) {
        display: block;
        position: absolute;
        left: 5px;
        top: 5px;
      }
      @include respond-to(md) {
        display: none;
      }
      @include respond-to(sm) {
        position: static;
        margin-bottom: 30px;
        display: block;
      }
      .ReserveInformation__line {
        margin: 0;
        font-size: $extraSmall;
        @include respond-to(sm) {
          font-size: $regular;
          padding: 10px;
        }
        .TokenIcon__dollar,
        .Value .Value__value {
          font-size: $extraSmall;
          @include respond-to(sm) {
            font-size: $regular;
          }
        }
      }
    }

    &__graph-inner {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      @include respond-to(xl) {
      }
      @include respond-to(md) {
        margin-bottom: 15px;
      }
      @include respond-to(sm) {
        flex-direction: column;
      }
    }

    &__middle-info {
      display: flex;

      margin-bottom: 35px;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
        display: flex;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__line {
      font-size: $small;
      min-width: 160px;
      @include respond-to(xl) {
      }
      .BlockWrapper {
        width: 100%;
      }
      strong {
        margin-left: 5px;
        white-space: nowrap;
      }
      .TokenIcon__dollar,
      .Value .Value__value {
        font-size: $large;
        margin-top: 5px;
        font-weight: 600;
        @include respond-to(xl) {
        }
      }
    }

    &__APY-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 35px;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
        margin-bottom: 20px;
      }
      @include respond-to(sm) {
        margin-bottom: 35px;
        flex-direction: column;
      }
    }

    .GradientLine__vertical {
      margin: 0 10px;
    }

    .GradientLine__horizontal {
      margin: 20px 0;
    }

    &__bottom-info {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      margin: 0 auto;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
      @include respond-to(sm) {
        max-width: 100%;
      }
    }

    &__poolLink-inner {
      position: relative;
      font-size: $medium;
      display: flex;
      align-items: center;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        justify-content: flex-end;
        text-align: right;
      }
      @include respond-to(md) {
        justify-content: flex-start;
        text-align: left;
      }
      @include respond-to(sm) {
        display: none;
      }
      img {
        width: 12px;
        height: 12px;
        margin-left: 5px;
      }
    }
  }
`;

export default staticStyles;
