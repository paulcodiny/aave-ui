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
      width: calc(100% + 1px);
      display: flex;
    }
    &__button {
      display: flex;
      align-items: center;
      border-right: 1px solid #ffffff;
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

      &:first-of-type {
        border-top-left-radius: 4px;
      }

      &:last-of-type {
        border-top-right-radius: 4px;
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
