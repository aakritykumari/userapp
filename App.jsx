import React from 'react';
//import './main.css';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userName: "",
		}
	}
	
	componentDidMount(){ 
		this.setState({
			userName: localStorage.getItem('UserName')
		})
	}
	render(){
		console.log('I am inside App');
		return(<div><b>Your Detail is:</b> <br/>
		       <label> <b>Full name: </b></label>
			   <input type="text" disabled value={this.state.userName}/>
		</div>)
	}

   }
export default App;