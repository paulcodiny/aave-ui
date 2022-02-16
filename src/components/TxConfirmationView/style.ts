import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TxConfirmationView {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    width: 410px;
    margin: 0 auto;
    @include respond-to(xl) {
    }
    @include respond-to(lg) {
    }
    @include respond-to(md) {
    }
    @include respond-to(sm) {
      width: 100%;
      max-width: 380px;
    }

    &__content-inner {
      margin-bottom: 20px;
      width: 100%;
      text-align: center;
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
    }
    &__contentInner {
      margin-bottom: 0;
    }

    &__content {
      padding: 30px 25px;
      border-radius: $borderRadius;
      border: 1px solid #e2e2e2;

      .Row__title {
        font-size: $small;
      }

      .Value__value,
      .Value__symbol,
      .ValuePercent__value,
      .ValuePercent__value span {
        font-weight: 600 !important;
      }
    }

    &__actions-inner {
      width: 100%;
    }

    .TokenIcon.TokenIcon .TokenIcon__name {
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
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    .InfoPanel {
      &:last-of-type {
        margin-top: 15px;
      }
    }
  }
`;

export default staticStyles;
