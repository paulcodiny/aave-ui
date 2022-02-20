import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ManageRadiant__content-item {
    background: #fff;
    border-radius: $borderRadius;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    margin-bottom: 30px;
    padding: 20px 30px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .ManageRadiant__content-title {
    display: flex;
    justify-content: space-between;

    h3 {
      font-size: $large;
      color: #131313;
      padding-left: 40px;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: -4px;
        width: 30px;
        height: 30px;
      }
    }

    span {
      background: #131313;
      color: #ffffff;
      padding: 6px 15px 5px;
      border-radius: 14.5px;
      font-size: $extraSmall;
    }
  }

  .ManageRadiant__content-description {
    margin-top: 15px;

    p {
      color: #7f7f7f;
      font-size: $medium;
      font-family: 'roboto-font';
      margin-bottom: 10px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .ManageRadiant__content-form {
    margin-top: 50px;
  }

  .ManageRadiant__form-legend {
    display: flex;
    justify-content: space-between;
  }

  .ManageRadiant__input-label {
    font-size: $medium;
    color: #131313;
    font-weight: 600;
  }

  .ManageRadiant__value {
    height: 30px;
    text-align: right;
  }

  .ManageRadiant__value-rnd {
    color: #131313;
    font-size: $medium;
  }

  .ManageRadiant__value-usd {
    color: #7f7f7f;
    font-size: $extraSmall;
  }

  .ManageRadiant__form-controls {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;

    .ConnectButton__inner {
      width: 100px;
      min-height: 32px;
    }
  }

  .ManageRadiant__form-input {
  }

  .ManageRadiant__form-button {
  }
`;

export default staticStyles;
