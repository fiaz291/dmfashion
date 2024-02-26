import css from "styled-jsx/css";

export default css`
  @import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&family=Nunito:wght@200;300;400;500;600;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400..700&display=swap");
  .main {
    font-size: 50px;
  }

  main {
    max-width: 700px;
    border: 1px solid black;
    padding: 20px;
  }

  .urdu {
    font-family: "Noto Nastaliq Urdu", serif;
    text-align: right;
  }

  .button {
    margin-bottom: 8px; 
    height: 38px;
    margin-left: 10px;
    background-color: red;
    border: none;
    padding: 0 10px;
    border-radius: 4px;
    color: #fff;
  }


  .submit-button {
    height: 40px;
    width: 120px;
    background-color: #000;
    border: none;
    padding: 0 10px;
    border-radius: 4px;
    font-size: 24px;
    color: #fff;
  }
`;
