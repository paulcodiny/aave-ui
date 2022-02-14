import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DotStatus {
    font-size: $small;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    white-space: nowrap;
    @include respond-to(xl) {
    }
    @include respond-to(lg) {
    }
    @include respond-to(md) {
    }

    .DotStatus__loader {
      left: 5px;
      margin-left: 5px;
      top: 3px;
    }

    &__dot {
      width: 10px;
      height: 10px;
      margin-left: 5px;
      border-radius: 50%;
    }
  }
`;

export default staticStyles;
