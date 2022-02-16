import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableButtonCol__button.TableButtonCol__button {
    margin: 5px 1px;
    width: 70px;
    min-height: 24px;
    font-size: $extraSmall;
    @include respond-to(xl) {
    }
    @include respond-to(lg) {
    }
    @include respond-to(md) {
    }
  }
`;

export default staticStyles;
