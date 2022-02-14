import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ActionsWrapper {
    width: 100%;
    border-radius: $borderRadius;
    border: 1px solid #e2e2e2;
    display: flex;
    flex-direction: column;
    transition: $transition;

    &__buttons {
      width: 100%;
      display: flex;
    }
    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: 20px;
      font-size: $small;
      flex: 1;
      font-weight: 600;
      transition: $transition;
      cursor: default;
      padding: 6px 0;
      background: #e2e2e2;
      &:last-of-type {
        border-right: none !important;
      }
      span,
      p {
        opacity: 0.8;
      }
      span {
        font-weight: 600;
        margin-right: 5px;
      }
    }

    &__buttonActive,
    &__buttonSubmitted,
    &__buttonConfirmed,
    &__buttonError {
      span,
      p {
        opacity: 1;
      }
    }
  }
`;

export default staticStyles;
