import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ManageRadiantMain__top {
    display: flex;
    gap: 30px;

    p {
      font-size: $medium;
      margin-top: 15px;
    }
  }

  .ContentWrapperWithTopLine__content {
    display: flex;
  }

  .ManageRadiantMain__top-revenue {
    width: 50%;
    display: flex;
    flex-direction: column;

    .ContentWrapperWithTopLine__content {
      padding: 30px 35px;
    }

    .GradientLine {
      margin: 0 30px;
    }
  }

  .ManageRadiantMain__revenue-item {
  }

  .ManageRadiantMain__top-fee {
    width: 50%;
    display: flex;
    flex-direction: column;

    .ContentWrapperWithTopLine__content {
      padding: 30px 35px;
    }

    .GradientLine {
      margin: 0 30px;
    }
  }

  .ManageRadiantMain__fee-item {
  }

  .ManageRadiant__content {
    display: flex;
    margin-top: 45px;
  }

  .ManageRadiant__left-column {
    display: flex;
    flex-direction: column;
    width: 450px;
  }

  .ManageRadiant__right-column {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    flex: 1;
  }
`;

export default staticStyles;
