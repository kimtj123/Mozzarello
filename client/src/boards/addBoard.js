import React from 'react';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

export default class addBoard extends React.Component {  
  constructor(props){
    super(props)
    this.state = {
      themeColor : this.props.newBoardColor
    }
  }
render(){      
  let inputTitle = {
    backgroundColor: this.props.newBoardColor || "#FE2E2E" ,
    borderRadius: "3px",
    boxSizing: "border-box", 
    display: "inline-flex",
    height: "96px",
    margin: 0,
    padding: "10px 10px 10px 16px",
    position: "relative",
    width: "296px",
  }
  return (
    // 전체화면을 덮는 div
    <div className ="coverWholeDisplay" 
      style = {
      this.props.modalStatus === true ? 
      styles.wrapper : 
      styles.closedWrapper
      }
      > 
      {/*여긴 아니다 */}
      <div className = "formWrapper" style = {styles.formWrapper}>      
        <form>
          <div className = "formContatiner" style = {styles.formContatiner}>            
            <div className = "inputTitle" style = {inputTitle}>
              <input 
                value = {this.props.newBoardTitle}
                onChange = {this.props.getBoardTitle}                
                style = {styles.inputStyle} 
                placeholder = "보드명을 입력해주세요."
                />
              <Button style = {styles.closeButton} onClick = {this.props.closeModal}>
                <CloseIcon />
              </Button>
            </div>
              <ul className = "selectTheme" style = {styles.selectTheme}>
                {
                  styles.gridItems.map((val, index) => 
                  <li className = {`gridItem`} style = {styles.gridItem} key = {"gridItem" + index}>
                    <button type = "button" style = {val} onClick = {this.props.getBoardColor}></button>
                  </li>            
                  )
                }                
              </ul>            
          </div>
          <div className = "createBoardWrapper" style = {styles.createBoardWrapper}>
              <Button onClick = {this.props.createBoard} variant="contained" style = {{color: "#585858", } }>
                보드 추가
              </Button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

// let theme = this.props.newBoardColor ? this.props.newBoardColor : "white"

const styles = { 
  createBoardWrapper : {
    background: "transparent",
    width: "444px",
    marginRight: "8px",
    marginTop: "8px",
  },  
  formWrapper:{
    marginTop : "20vh"
  },
  wrapper : {
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    overflowX: "hidden",
    overflowY: "auto",
    justifyContent: "center",    
    position: "fixed",        
    zIndex: 20,
  },
  closedWrapper : {  
    alignItems: "flex-start",  
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display : "none",        
    height: "100%",
    width: "100%",
    left: 0,
    overflowX: "hidden",
    overflowY: "auto",
    justifyContent: "center",    
    position: "fixed",        
    zIndex: 20,
  },  
  inputStyle : {
    width : "80%",
    height : "22px",
    boxShadow: "none",
    background: "none",
    border: "none"
  },
  selectTheme : {
    display: "flex",
    margin: "0px 8px 0px 8px",
    flexWrap: "wrap", 
    height: "36px",
    listStyle: "none",
    padding: "0px",                   
    width: "140px",    
  },
  formContatiner : {
    display: "inline-flex",
    flexWrap: "wrap",
  },
  gridButton : {
    backgroundColor: "rgb(0, 121, 191)",
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "3px",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton : {
    background: "none",
    border: "none",
    color: "black",
    float: "right",
    height: "28px",
    padding: 0,   
    width: "28px",         
  },  
  gridItems : [
    {
      backgroundColor : "#FE2E2E",
      border: "none",
      borderRadius: "3px",
      height: "28px",
      width: "28px",
      margin: "3px 0px 0px 14px",
      display: "list-item",      
    },
    {
      backgroundColor : "#FFEB5A",
      border: "none",
      borderRadius: "3px",
      height: "28px",
      width: "28px",
      margin: "3px 0px 0px 14px",
      display: "list-item",
    },
    {
      backgroundColor : "#ACFA58",
      border: "none",
      borderRadius: "3px",
      height: "28px",
      width: "28px",
      margin: "3px 0px 0px 14px",
      display: "list-item",
    },
    {
      backgroundColor : "indigo",
      border: "none",
      borderRadius: "3px",
      height: "28px",
      width: "28px",
      margin: "3px 0px 0px 14px",
      display: "list-item",
    },
    {
      backgroundColor : "#DBA901",
      border: "none",
      borderRadius: "3px",
      height: "28px",
      width: "28px",
      margin: "3px 0px 0px 14px",
      display: "list-item",
    },
    {
      backgroundColor : "cornflowerblue",
      border: "none",
      borderRadius: "3px",
      height: "28px",
      width: "28px",
      margin: "3px 0px 0px 14px",
      display: "list-item",
    },
    {
      backgroundColor : "#B404AE",
      border: "none",
      borderRadius: "3px",
      height: "28px",
      width: "28px",
      margin: "3px 0px 0px 14px",
      display: "list-item",
    },
    {
      backgroundColor : "#088A85",
      border: "none",
      borderRadius: "3px",
      height: "28px",
      width: "28px",
      margin: "3px 0px 0px 14px",
      display: "list-item",
      },
    {
      backgroundColor : "#4B8A08",
      border: "none",
      borderRadius: "3px",
      height: "28px",
      width: "28px",
      margin: "3px 0px 0px 14px",
      display: "list-item",
      }
    ]  
}