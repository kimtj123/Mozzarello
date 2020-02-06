import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

export default class BoardList extends React.Component{    

    constructor(props)
    {
        super(props)
        this.state = {
            id : this.props.id,
            list : this.props.list
        }   
    }
    
    render(){
    let list = this.props.list
    console.log(this.props.title)
    return (
        <div>
            <div style = {{display : "inline-flex", width : "100%"}}>
                <input className = "list-name-input" 
                    style = {styles.listNameInput} 
                    placeholder = "제목"                                                               
                    defaultValue = {this.props.title === " " ? null : this.props.title}
                    onBlur = {this.props.changeTitle}
                >
                </input>
                <div className = "list-add-control" 
                    onClick = {this.props.deleteCard} 
                    title = {this.props.title}
                >
                    <DeleteIcon />
                </div>         
            </div>    
            {
                list.map((val,index) => {
                   return (
                        <div className = "listCardDetailWrapper" 
                        style = {styles.listCardDetailWrapper} 
                        key = {index}
                        title = {this.props.title}                    
                        >
                        {
                             this.props.clickedList !== val._id ?
                             <span // 클릭 시 display none
                                id = {val._id}
                                style = {styles.listDetails}
                                onClick = {this.props.getListName}
                            >
                                {val.content}
                            </span>       :
                            <textarea 
                            id = {val._id}
                            className = "listDetailsInput"
                            autoFocus="autoFocus"
                            onFocus={function(e) {
                                var val = e.target.value;
                                e.target.value = '';
                                e.target.value = val;
                              }}
                            style = {styles.listDetailsTextArea } 
                            rows = "3" 
                            cols = "50"
                            placeholder = "내용"
                            onChange = {this.props.listContent}
                            onBlur = {async (e) =>{
                                await this.props.changeContent(e)
                                await this.props.getListName(e)
                            }}
                            name = {val.content}
                            defaultValue = {val.content}                            
                            />                           
                        }
                            <IconButton style = {{padding : "0px"}} 
                                onClick = {this.props.deleteList}
                                title = {this.props.title + index}
                            >
                                <CloseIcon style = {styles}/>
                            </IconButton>                                     
                        </div>
                    )}
                )
            }
        </div>
        )    
    }
}


const styles = {
iconStyle : {
    fontSize: "18px", 
    paddingRight: "5px" 
},
titleInput : {
    background: "none",
    border: "none",
    fontWeight: "bold",
    color: "#6b778c",
},
listNameInput: {
    background: "none",
    border: "none",
    borderRadius: "3px",
    boxShadow: "none",
    padding: "4px 8px 4px 8px",
    fontWeight: 600,    
    lineJeight: "20px",
    width: "calc(100% - 16px)",
    marginBottom: "5px"
},
listCardDetailWrapper : {    
    background : "white",
    borderRadius: "3px",
    boxShadow: "0 1px 0 rgba(9,30,66,.25)",    
    display : "inline-flex",
    overflow : "hidden",
    marginBottom: "10px",
    width: "100%"
},
listDetails: {
    background: "white",
    border: "none",    
    boxShadow: "none",
    borderRadius: "3px",
    padding: "4px 8px 4px 8px",
    fontWeight: 600,
    width: "calc(100% - 16px)",
    height: "20px",
    outline:"none" ,
},
listDetailsTextArea: {
    background: "white",
    border: "none",    
    boxShadow: "none",
    borderRadius: "3px",
    padding: "4px 8px 4px 8px",
    fontWeight: 600,
    width: "calc(100% - 16px)",
    height: "60px",
    outline:"none" ,
    resize: "none",
},
}