import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

export default class Todo extends React.Component {

    constructor(props) {
      super(props);
      this.state={todos:[]};
    }

    save() {
      var todos = [...this.state.todos];
      todos.push(this.newText.value);
      this.setState({todos});
    }

    _deleteTodo(value){
       let todos = this.state.todos.slice();  
       todos.splice(todos.indexOf(value), 1);
       this.setState({todos});  
    }


    render(){
        return(
            <div className="list">
              <h1> TO-DO List</h1>
              <input type="text" ref={(ip) => {this.newText = ip}}/>
              <button onClick={this.save.bind(this)} className="btn btn-primary glyphicon glyphicon-floppy-saved">Save
              </button>
              <ul>
                {this.state.todos.map((todo) => {
                    return <li onClick={this._deleteTodo.bind(this, todo)}>{todo}</li>
                })}
              </ul>
            </div>
        )
    }
};