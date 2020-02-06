import React from 'react';
import Button from '@material-ui/core/Button';

export default class MyInfo extends React.Component {  

    constructor(props)
    {
        super(props)
        this.state = {            
            email: '',
            username: '',
            oldpwd: '',
            newpwd : ''            
        }
        this.submit = this.submit.bind(this);
        this.email = this.email.bind(this);
        this.username = this.username.bind(this);
        this.oldpwd = this.oldpwd.bind(this);
        this.pwdchk = this.pwdchk.bind(this);
    }
    email(e){
        let value = e.target.value
        this.setState ({
            email : value
        })
    }
    username(e){
        let value = e.target.value
        this.setState ({
            username : value
        })
    }
    oldpwd(e){
        this.setState({
            oldpwd : e.target.value
        })
    }
    pwdchk(e){
        this.setState({
            pwdchk : e.target.value
        })
    }
    async submit()
    {
        let URL = `http://localhost:4000/users/myinfo/${this.state.email}`
        let changepwd = {
            oldpwd : this.state.oldpwd,
            newpwd : this.state.newpwd
        }
        let status;

        await fetch(URL, {
            method : "PATCH" ,
            headers: {
                'Content-Type': 'application/json',          
            },
            body : JSON.stringify(changepwd)
        })
        .then(res =>  {
            status = res.status
            return res.json()
        }) 
        .then(res =>  alert(res[0])) 

        if(status === 200)
            await this.props.history.push("/boards")
    }
    componentDidMount(){
        let checkURL = "http://localhost:4000/users/check"
        let option = {
          credentials: "include"
        }
        fetch(checkURL, option)
        .then(res => res.json())
        .then(res => {
          this.setState({
            email : res.email,
            username : res.username
          })
          console.log("res :: ", res)
        })
        .catch(err => console.error(err))      
      }
      
    render()
    {    

        let inputTitle = ["이메일","이름","기존 비밀번호","새로운 비밀번호"]
        return (
        <div style = {styles.wrapper}>
            <div>
                <img style = {styles.image} src = {require('./common/Mozzarello.png')} alt = "Mozzallo logo"/>          
            </div>
            <div style = {styles.backGround}>
                <div style = {styles.titleWrapper}>
                    <p style = {styles.titleText}>개인정보 수정</p>
                </div>
                {
                    inputTitle.map((val) => {                
                    if(val === "기존 비밀번호" || val === "새로운 비밀번호"){
                        return (
                            <div>
                                <input type = "password"                                     
                                    className = {val} 
                                    onChange = {(e) => {
                                    if(val === "기존 비밀번호"){
                                        this.setState({
                                            oldpwd : e.target.value
                                        })
                                    }
                                    else {
                                        this.setState({
                                            newpwd : e.target.value
                                        })
                                    }}
                                    }                                
                                    style = {styles.input}
                                    placeholder = {val}                                
                                >   
                                </input>                          
                            </div>
                            )
                        }
                    else if(val === "이메일"){
                        return (
                            <div>
                                <input                                     
                                    className = {val} 
                                    style = {styles.inputNotChange}
                                    placeholder = {val}              
                                    value = {this.state.email}                                             
                                >   
                                </input>                          
                            </div>
                            )
                    }
                    else if(val === "이름"){
                        return (
                            <div>
                                <input 
                                    className = {val} 
                                    style = {styles.inputNotChange}
                                    placeholder = {val}     
                                    value = {this.state.username}                           
                                >   
                                </input>                          
                            </div>
                            )
                    }             
           
                    }
                )}                            
                <Button onClick = {this.submit} variant="contained" color="primary" style = {styles.button}>
                    회원정보 수정
                </Button>                      
            </div>       
        </div>    
            )
    }
}


const styles = {
    backGround : 
    {
        backgroundColor: 'white',
        boxShadow: 'rgba(0,0,0,0.1) 0 0 10px',
        width: '400px',
        height: '450px',
        position: 'absolute',
        top: '40%',
        marginTop: '-230px',
        left: '50%',
        marginLeft: '-200px'
    },
    button : {
        marginTop: "20px",
        width: "260px",
        backgroundColor: "#01A9DB"
    },   
    titleWrapper : {
        marginTop : "20px",
        marginBottom : "20px",
    },
    titleText : {
        fontSize: "25px"
    },
    wrapper :
    {
        marginTop: "25vh",
        textAlign: 'center'        
    },  
    input :
    {
        color: "rgba(0,0,0,0.25)",
        width: "250px",
        height: "33px",        
        marginTop : "10px",
        padding:"4px",
        borderRadius: "5px",
        border: "solid 1px",
        fontSize: "15px"
    },
    inputNotChange:
    {
        color: "black",
        width: "250px",
        height: "33px",        
        marginTop : "10px",
        padding:"4px",
        border: "solid 1px",
        borderColor : "rgba(0,0,0,0.25)",
        borderRadius: "5px",                        
        fontSize: "15px"
    },
    span :
    {
        width: "250px",
        height: "33px",        
        marginTop : "10px",
        padding:"4px",
        fontSize: "15px"
    },
    image : 
    {
        position: 'absolute',
        top: '0%',
        marginTop: '50px',
        left: '50%',
        marginLeft: '-95.5px',
    },
}