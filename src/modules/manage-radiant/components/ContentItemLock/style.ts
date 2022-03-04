import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ManageRadiant__content-lock {
    .BasicForm {
      max-width: none;
      display: flex;

      .AmountField {
        width: 250px;
      }

      .AmountField .AmountField__input input {
        padding-top: 11px;
        padding-bottom: 11px;
      }

      .BasicField input {
        font-size: $medium;
      }

      .BasicForm__buttons {
        margin-top: 0;
        margin-left: 20px;
      }
    }
  }
`;

export default staticStyles;
