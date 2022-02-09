import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .UserInfo {
    &__stats {
      display: flex;
      font-size: 12px;
      gap: 24px;
    }

    &__item {
      color: #fff;
    }

    &__value {
      display: block;
    }

    &__text {
      opacity: 0.5;
    }

    &__time {
      opacity: 0.2;
    }
  }
`;

export default staticStyles;
