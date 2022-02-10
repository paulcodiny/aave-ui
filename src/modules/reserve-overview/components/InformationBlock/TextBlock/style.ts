import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TextBlock {
    font-weight: 600;
    font-size: $large;
    margin-top: 5px;
    @include respond-to(xl) {

    }
    @include respond-to(lg) {

    }
    @include respond-to(md) {

    }
    @include respond-to(sm) {
      font-size: $regular;
    }
  }
`;

export default staticStyles;
