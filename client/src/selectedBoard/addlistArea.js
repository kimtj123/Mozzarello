import React from 'react';

import AddIcon from '@material-ui/icons/Add';


export default function AddListButton(props){  
    return (
        <div 
        style = {props.state === props.title ? 
            styles.beforeClick :
            styles.afterClick 
        }  
        name = {props.title}
        onClick = {props.openAddList}
        >
            <span className = "placeholder" name = {props.title}>
                <span className = "addListElements" style = {styles.createListElements} name = {props.name}>
                    <AddIcon name = {props.title}/>
                </span>
                <span style = {styles.createListElements} name = {props.title}>
                    리스트 추가
                </span>                              
            </span>                            
        </div>  
    );
}

const styles = {
    beforeClick: {
        display: "none",        
    },
    afterClick: {
        textDecoration: "none",
    },
    createListElements : {
        color:"black",
        display: "table-cell", 
        lineHeight: "0px",
        verticalAlign : "middle",
    },    
}