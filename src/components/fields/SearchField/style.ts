import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SearchField {
    width: 240px;
    border-radius: $borderRadius;
    display: flex;
    align-items: center;
    position: relative;
    outline: none;
    background: #fff;
    border: solid 1px #d8d9e0;
    @include respond-to(xl) {
    }
    @include respond-to(lg) {
    }
    @include respond-to(md) {
    }
    @include respond-to(sm) {
      width: 100%;
      max-width: 335px;
    }

    .SearchField__image {
      margin-right: 15px;
      width: 14px;
      height: 14px;
      @include respond-to(xl) {
        margin-right: 10px;
      }
      @include respond-to(lg) {
        width: 12px;
        height: 12px;
      }
      @include respond-to(md) {
        margin-right: 15px;
        width: 14px;
        height: 14px;
      }
    }

    .BasicField {
      input {
        padding: 9px 0 9px 15px;
        font-size: $regular;
        @include respond-to(xl) {
        }
        @include respond-to(lg) {
        }
        @include respond-to(md) {
        }
        @include respond-to(sm) {
          padding: 12px 0 12px 15px;
          font-size: $medium;
        }
      }
    }
  }

  .SearchFieldFocused {
    &:after {
      border-width: 2px;
    }
  }
`;

export default staticStyles;
