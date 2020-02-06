import React from 'react';

import AddBoard from './boards/addBoard';
import BoardHeader from './common/BoardHeader';
import { BrowserRouter as Router, Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';


export default class Boards extends React.Component {  
  constructor(props){
    super(props)
    this.state = {           
      user_id : "",
      email : "",
      username : "",
      allBoards : ['addBoard'],
      hoverTarget : '',
      modal : false ,
      newBoardTitle : '',
      newBoardColor : '#FE2E2E',
    }

    this.gotoMainPage = this.gotoMainPage.bind(this);
    this.getBoardTitle = this.getBoardTitle.bind(this);
    this.getBoardColor = this.getBoardColor.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    // 생성창 열고 닫기
    this.openModal =  this.openModal.bind(this);
    this.closeModal =  this.closeModal.bind(this);
    // 생성관련
    this.multipleElements = this.multipleElements.bind(this);
    this.separateElement = this.separateElement.bind(this);
    this.createBoard = this.createBoard.bind(this);
    // 정보 불러오기
    this.loadBoards = this.loadBoards.bind(this);

  }
async deleteBoard(e){
  // let newBoard = this.state.allBoards.slice();
  let deleteTarget = e.currentTarget.parentNode.className;
  console.log(deleteTarget)
  let URL = `http://localhost:4000/users/deleteboard/${deleteTarget}`
  console.log("deleteURL :: ", URL)
  await fetch(URL, { 
    method: 'delete',
   })
  .then(res => res.text()) // json 형식이 아닌 text 형식으로 해야 json 오류가 나지 않는다.
  .then(res => console.log(res));

  await this.loadBoards();
}
getBoardTitle(e){
  let boardTitle =  e.target.value
  this.setState({newBoardTitle : boardTitle})
}
getBoardColor(e){
  let boardColor = e.target.style.backgroundColor
  this.setState({newBoardColor : boardColor})
}

openModal(){
  this.setState({modal : true})
} 
closeModal(){
  this.setState({
    modal : false,
    newBoardTitle :  ""
  })
} 

multipleElements(Boards) {
  // 여기 참고 https://bit.ly/2Z6LhaP
  let elements = [];
  for(let i = 0; i < Boards.length; i++) 
  {
    if(Boards[i] !== 'addBoard')
    {
      let onMouseStyle = {
        borderRadius: "5px",
        background: Boards[i].color,
        display : "table",
        height : "12vh",
        opacity : "0.7",
        position : "relative",
        width: "20vw",    
        margin: "0 8px 8px 0",
        maxWidth : "250px",
        maxHeight : "150px",
        minHeight : "90px"
      }
      let outMouseStyle = {
        borderRadius: "5px",
        background: Boards[i].color,
        display : "table",
        height: "12vh",
        position : "relative",
        width: "20vw",    
        margin: "0 8px 8px 0",
        maxWidth : "250px",
        maxHeight : "150px",
        minHeight : "90px"
      }    
      elements.push(
          <li
            className = {Boards[i]._id}   
            onMouseOver={(event) => { 
              this.setState({hoverTarget : event.currentTarget.className}) 
            }
            } 
            onMouseOut={(event) => { this.setState({hoverTarget : ""}) }}
            style = {
              this.state.hoverTarget === Boards[i]._id ? 
              onMouseStyle : 
              outMouseStyle     
            }             
          >            
            <Link style = {styles.aTag} title = {Boards[i].title}
            // 새로고침하면 props가 저장이 안된다. 고로 localstorage에 저장해 값을 넘기도록 하자
            // 처음에 Boards[i]._id로 넘겨주었지만 마지막 값만이 리턴된다. var도 아닌데 왜그러는지 모르것네
              onClick = {(e) => {
                localStorage.setItem("boardID",e.currentTarget.parentNode.className)         
                localStorage.setItem("boardTitle",e.currentTarget.title)       
              }}
              to = {{
                pathname: "/SelectedBoard",
                }} >        
              <div style = {{
                bottom: 0,
                left: 0,
                position: "absolute",
                right: 0,
                top: 0,
              }}>
                  <p style = {styles.boardTitle}>
                    {Boards[i].title}
                  </p>                       
                </div>            
              </Link>
          <IconButton
            style = {{
              bottom : 0,     
              right: 0,
              background: "none",
              position : "absolute"
            }}
            onClick = {this.deleteBoard}                
          > 
            <DeleteIcon />
          </IconButton> 
        </li>   
      )
    }
    else if(Boards[i] === 'addBoard')
    {
      elements.push(
        <li 
            // 여기와 밑의 className이 동일한 이유는 Hover이벤트 적용때문.....
          onMouseOver=
          {
            (event) => { 
              this.setState({hoverTarget : event.target.className}) 
            }
          } 
          onMouseOut={(event) => { this.setState({hoverTarget : ""}) }}
          style = {this.state.hoverTarget !== Boards[i] ? styles.liStyle : styles.hoverLiStyle} 
          onClick = {this.openModal}
        > 
          <div className = {Boards[i]} style = {styles.addBoardWrapper}> 
              <AddCircleRoundedIcon style = {styles.addBoard}/>
          </div>
        </li>      
      )
    }
  }
  return elements;
}
separateElement (Boards) { 
  let separateElements = [];
  let multiElements = this.multipleElements(Boards);
 
  for(let i = 0; i < multiElements.length; i+=4) {
  let oneRow = [];
  oneRow.push(multiElements.slice(i, i+4).map(title => {
    return (
      <div className ="item"> {title} </div>
      )
    }
  ))

  separateElements.push(oneRow.map(itm => {
    return <div style = {{display: "inline-flex"}}>
            {itm}
          </div>
      }
    ))
  }
  return separateElements;
 }    
async createBoard(){  
  let URL = "http://localhost:4000/users/boards";       
  let copyState = Object.assign({},this.state);
  let board = {
    email : copyState.email,
    title : copyState.newBoardTitle,
    color : copyState.newBoardColor,
    list : []    
  }

  await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(board),
      headers: {
        'Content-Type': 'application/json',          
      },
      credentials: 'include',
    })
    .then(res => {      
        if(res.status === 201)    
        {
            console.log("보드생성");  
        }
        return res.json()
    })
    .then(res => console.log(res))
    .catch(error => console.error(error))

    await this.closeModal()
    await this.loadBoards()
}
async loadBoards(){
  let boardsURL = "http://localhost:4000/users/boards/"
  let option = {
    credentials: "include"
  }
  await fetch(boardsURL + this.state.email, option)
  .then(res => res.json())
  .then(res => {
    let newBoards = res.boards
    newBoards.push('addBoard')
    this.setState({      
      allBoards : newBoards
    })
  })
  .catch(err => console.error(err))
}
gotoMainPage(){
  this.props.history.push("/")
}

async componentDidMount(){
  let checkURL = "http://localhost:4000/users/check"
  let option = {
    credentials: "include"
  }
  await fetch(checkURL, option)
  .then(res => res.json())
  .then(res => {
    this.setState({
      user_id : res._id,
      email : res.email,
      username : res.username
    })
    console.log("res :: ", res)
  })
  .catch(err => console.error(err))

  await this.loadBoards();
}

render(){    
  return (
      <div>
        <BoardHeader gotoMainPage = {this.gotoMainPage} username = {this.state.username}/>
        <div style = {styles.listsWrapper}>
          <h3>전체 보드</h3>
            <ul style = {styles.ulStyle} >            
            {     
                this.separateElement(this.state.allBoards)     
            }           
            </ul>
        </div>
        <AddBoard           
          newBoardTitle= {this.state.newBoardTitle}
          createBoard = {this.createBoard} 
          closeModal = {this.closeModal}
          getBoardTitle = {this.getBoardTitle}
          getBoardColor = {this.getBoardColor}
          modalStatus = {this.state.modal}       
          newBoardColor = {this.state.newBoardColor}        
        />
    </div>
    );
  }
}


const styles = {
  listsWrapper : {
    margin: "40px auto",
    maxWidth: "1250px"
  },
  ulStyle : {
    listStyleType: "none",
  },
  liStyle : {
    borderRadius: "5px",
    background: "lightgray",
    display : "table",
    height: "12vh",
    width: "20vw",    
    margin: "0 8px 8px 0",
    maxWidth : "250px",
    maxHeight : "150px",
    minHeight : "90px"
  },
  hoverLiStyle : {
    borderRadius: "5px",
    background: "lightgray",
    display : "table",
    height : "12vh",
    opacity : "0.7",
    width: "20vw",    
    margin: "0 8px 8px 0",
    maxWidth : "250px",
    maxHeight : "150px",
    minHeight : "90px"
  },

  addBoard : {
    color : "white",
    fontSize: "40px", 
  },
  addBoardWrapper : {
    display : "table-cell",
    textAlign : "center",
    verticalAlign : "middle"
  },
  aTag : {
    textDecoration: "none",
  },
  boardTitle : {
    overflow: "hidden",
    textOverflow: "ellipsis",    
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: "20px",
    margin : "10px"
  },
}