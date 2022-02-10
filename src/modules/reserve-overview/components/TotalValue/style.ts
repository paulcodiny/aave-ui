import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TotalValue {
    display: flex;
    min-width: 350px;
    @include respond-to(xl) {
      min-width: 300px;
    }
    @include respond-to(lg) {
      min-width: 190px;
    }
    @include respond-to(md) {
      min-width: 200px;
    }
    @include respond-to(sm) {
      min-width: 100%;
      order: 1;
      margin-bottom: 30px;
    }

    &__green {
      justify-content: flex-start;
      @include respond-to(sm) {
        justify-content: center;
      }
      .Value {
        align-items: flex-start;
        @include respond-to(sm) {
          align-items: center;
        }
      }
    }
    &__red {
      justify-content: flex-end;
      @include respond-to(sm) {
        justify-content: center;
      }
      .TotalValue__inner {
        align-items: flex-end;
      }
      .TotalValue__title {
        @include respond-to(sm) {
          flex-direction: row;
        }
        i {
          margin-left: 0 !important;
          margin-right: 5px;
          @include respond-to(xl) {
            margin-right: 3px;
          }
          @include respond-to(sm) {
            margin-right: 0;
            margin-left: 5px !important;
          }
        }
      }
      .Value {
        @include respond-to(sm) {
          align-items: center;
        }
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      @include respond-to(sm) {
        justify-content: center !important;
        align-items: center !important;
      }
    }

    .TotalValue__title {
      font-size: $regular;
      display: flex;
      align-items: center;
      font-weight: 300;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $regular;
        font-weight: 400;
      }
      i {
        border-radius: 2px;
        display: block;
        width: 12px;
        height: 12px;
        margin-right: 10px;
        @include respond-to(xl) {
        }
        @include respond-to(lg) {
        }
        @include respond-to(md) {
        }
        @include respond-to(sm) {
          margin-left: 5px;
        }
      }
    }

    .Value .Value__value {
      position: relative;
      margin-top: 16px;
      margin-bottom: 6px;
      padding-bottom: 6px;
      font-size: 28px;
      font-weight: 600;
      @include respond-to(xl) {
      }
      @include respond-to(lg) {
      }
      @include respond-to(md) {
      }
      @include respond-to(sm) {
        font-size: 30px;
      }
    }

    .Value .SubValue {
      color: #7f7f7f;
      font-size: $regular;
      font-weight: 300;
      white-space: nowrap;
      @include respond-to(xl) {
      }
      @include respond-to(sm) {
        font-size: $medium;
        font-weight: 400;
      }
    }
  }
`;

export default staticStyles;
