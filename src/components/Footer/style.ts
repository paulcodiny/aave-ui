import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Markets {
    &__powered_by {
      text-align: center;
      margin-top: 28px;

      p {
        opacity: 0.5;
        font-family: 'roboto-font';
        font-size: 10px;
        color: #000;
      }

      img {
        width: 98px;
        height: 22px;
        mix-blend-mode: darken;
      }
    }
  }

  .Footer {
    background: #131313;
    justify-content: flex-end;
    position: relative;
    z-index: 2;
    padding: 10px 15px 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 20px;
    @include respond-to(xl) {
      padding: 10px;
    }
    @include respond-to(sm) {
      display: none;
    }

    &__inside {
      @include respond-to(md) {
        display: none;
      }
    }

    .DarkModeSwitcher {
      margin-right: 10px;
    }
  }
`;

export default staticStyles;
