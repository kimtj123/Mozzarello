import React from 'react';

import AddlistArea from './selectedBoard/addlistArea';
import AddlistContent from './selectedBoard/addlistContent';
import BoardHeader from './common/BoardHeader';
import CardList from './selectedBoard/cardList';

import AddIcon from '@material-ui/icons/Add';

import "./App.css"

export default class Boards extends React.Component {  
  constructor(props){
    super(props)
    this.state = {
        username : "",
        boardID : localStorage.getItem("boardID"),
        boardTitle : localStorage.getItem("boardTitle"),
        cardList : [],
        add : "",
        listContent : "",
        clickedList : null
    }
    console.log(localStorage.getItem("boardID") === this.state.boardID)

    this.addCard = this.addCard.bind(this);
    this.addList = this.addList.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.listContent = this.listContent.bind(this);
    this.loadCard = this.loadCard.bind(this);
    this.openAddList = this.openAddList.bind(this);
    this.closeAddList = this.closeAddList.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.getListName = this.getListName.bind(this);
    this.gotoMainPage = this.gotoMainPage.bind(this);
}
gotoMainPage(){
    this.props.history.push("/")
}

loadCard(){
    let URL = "http://localhost:4000/users/boards/cards/" + this.state.boardID

    fetch(URL)
    .then(res => res.json())
    .then(res => {
        this.setState({cardList : res.cards});
    })
}

getListName(e){
    console.log("getListName :: ",this.state.clickedList)
    console.log("e.currentTarget.id :: ", e.currentTarget.id)
if(this.state.clickedList === null)
{
    if(e.currentTarget.id !== undefined)
        this.setState( { clickedList : e.currentTarget.id })       
    else
                this.setState( { clickedList : e.currentTarget.id })       

}
else
{
    this.setState( { clickedList : null })        
}
}

openAddList(e){
    let nameVal = e.target.getAttribute('name')    
    this.setState({ add : nameVal })               
}
closeAddList(e){
    this.setState({ add : null})
}

addCard(e){
    let URL = "http://localhost:4000/users/boards/cards"
    let card = {
        "boardID" : this.state.boardID,
        "title" : " ", // 그냥 빈 스트링은 전송이 안된다..
        "list" : []
    }
    
    let options = {
        method: 'POST',
        body: JSON.stringify(card),
        headers: {
        'Content-Type': 'application/json',          
        },
        credentials: 'include'
    }
    fetch(URL, options)
    .then(res => res.json)
    .then(res => {
        this.loadCard()
        console.log(res)
        }
    )
}

deleteCard(e){        
    let deleteCard = e.currentTarget.parentNode.parentNode.parentNode.parentNode.id
    let URL = `http://localhost:4000/users/boards/deletecard/${deleteCard}`

    fetch(URL, { 
        method: 'delete',
       })
      .then(res => res.text()) // json 형식이 아닌 text 형식으로 해야 json 오류가 나지 않는다.
      .then(res => this.loadCard());
}

addList(e){
    let cardOfAddList = e.currentTarget.parentNode.parentNode.parentNode.parentNode.id
    let newList = this.state.listContent.slice() 
    console.log("listContent :: ", this.state.listContent);
    console.log("cardOfAddList :: ", cardOfAddList);
    console.log("newList :: ", newList);

    let URL = "http://localhost:4000/users/boards/cards/list/" + cardOfAddList
    let body = {
        "content" : newList
    }
    fetch(URL, { 
        method : "PATCH" ,
        headers: {
            'Content-Type': 'application/json',          
        },
        body : JSON.stringify(body)  
    })
    .then(res => res.json())
    .then(res => this.loadCard())     
}

changeTitle(e){
    let changeTitleOfCard = e.currentTarget.parentNode.parentNode.parentNode.parentNode.id
    let newTitle = e.currentTarget.value
    let URL = "http://localhost:4000/users/boards/cards/title/" + changeTitleOfCard
    let body = {
        "title" : newTitle
    }
    fetch(URL, { 
        method : "PATCH" ,
        headers: {
            'Content-Type': 'application/json',          
        },
        body : JSON.stringify(body)  
    })
    .then(res => res.json())
    .then(res => console.log(res)) 
    // 굳이 fetch를 안해도  input value라 바뀌어있으므로 서버에 요청할 필요 없지 않을까..
}

changeContent(e){    
    let listID = e.currentTarget.id
    let changeContentOfCard = e.currentTarget.parentNode.parentNode.parentNode.parentNode.id
    let newContent = e.currentTarget.value

    console.log("newContent ::", newContent, " type :: ", typeof newContent)
    console.log("listID ::", listID)
    console.log("changeContentOfCard ::", changeContentOfCard)

    let URL = `http://localhost:4000/users/boards/cards/changelist/${changeContentOfCard}/${listID}`
    // let body = {
    //     "content" : newContent
    // }
    // console.log(body)
    fetch(URL, {
        method : "PUT",
        headers: {
            'Content-Type': 'application/json',          
        },
        body : JSON.stringify({"content" : newContent})
    })
    .then(res => res.json)
    .then(res => this.loadCard());    
}
deleteList(e){
    
    let cardID = e.currentTarget.parentNode.parentNode.parentNode.parentNode.id
    let listID = e.currentTarget.parentNode.children[0].id
    let URL = `http://localhost:4000/users/boards/cards/deletelist/${cardID}/${listID}`
    
    fetch(URL, {
        method : "PUT",
        body : JSON.stringify({})
    })
    .then(res => res.json)
    .then(res => this.loadCard());    
}
listContent(e){            
    let content = e.currentTarget.value      
    console.log(content)
    this.setState({listContent : content});
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
        username : res.username
        })
    })
    .catch(err => console.error(err))

    await this.loadCard();
}

render(){     
    console.log(localStorage.getItem("boardTitle"))
    return (
        <div  style = {{width : "100%", height : "99vh"}}>
            <BoardHeader  
                gotoMainPage = {this.gotoMainPage}
                username = {this.state.username}
            />        
            <div className = "boardTitle">
                <h3>{this.state.boardTitle}</h3>
            </div>
            <div style = {{display: "inline-flex"}}>         
            {                
                this.state.cardList.map((val,index)=> 
                <div className = "addListWrapper" 
                    style = {styles.addListWrapper} 
                    key = {val.title+index} 
                    title = {val.title}
                    id = {val._id}
                >
                    <form>                                          
                        <CardList 
                            id = {val._id}
                            list = {val.list}
                            title = {val.title}           
                            
                            clickedList = {this.state.clickedList}
                            
                            addList = {this.addList}
                            changeContent = {this.changeContent}
                            changeTitle = {this.changeTitle}
                            deleteList = {this.deleteList}
                            focus = {this.state.focus}
                            listContent = {this.listContent}
                            deleteCard = {this.deleteCard}    
                            getListName = {this.getListName}                                                           
                        /> 
                        <AddlistArea
                            addList = {this.addList}
                            openAddList = {this.openAddList} 
                            state = {this.state.add} 
                            title = {val.title}
                        />                                                                                                                    
                        <AddlistContent 
                            addList = {this.addList}
                            getListName = {this.getListName}
                            listContent = {this.listContent}
                            openAddList = {this.openAddList}
                            closeAddList = {this.closeAddList} 
                            state = {this.state.add}
                            title = {val.title}
                        />                         
                    </form>
                </div>         
                )
            }                 
            <div className = "addListWrapper" 
            style = {styles.addListWrapper}
            onClick = {this.addCard}
            >
                <span className = "addListElements" style = {styles.createListIcon}>
                    <AddIcon />
                </span>
                <span style = {styles.createListText}>
                    카드 추가
                </span>     
            </div>      
        </div>         
    </div>
    );
  }
}


const styles = {

generatedListWrapper:{
    background: "white",
    border: "solid 1px lightgray",
    display : "table",
    height: "auto",
    width: "272px",
    padding: "6px 8px",
    borderRadius: "5px",
    marginLeft : "5px",
    marginRight : "5px",
    opacity: 0.9,
}
,
addListWrapper : {
    background: "#ebecf0",
    borderRadius: "5px",
    display : "table",
    padding: "6px 8px",
    marginRight : "20px",
    height: "auto",
    width: "272px",
    opacity: 0.7,    
},
addListElements : {
    color:"black",
    display: "table-cell", 
    lineHeight: "0px",
    verticalAlign : "middle",
},
aTag: {
    textDecoration: "none",
},
createListIcon : {
    color:"black",
    display: "table-cell",     
    lineHeight: "0px",
    verticalAlign : "middle",
    width : "25px"
},    
createListText : {
    color:"black",
    display: "table-cell",     
    lineHeight: "0px",
    verticalAlign : "middle",
},    
}