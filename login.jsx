import React from 'react';
//import { Router, browserHistory } from 'react-router';

import  { Redirect } from 'react-router-dom'
//import history from './history'
import { Link , browserHistory} from 'react-router-dom';

class Login extends React.Component {
	constructor(props){
       super(props);

       this.state = {		   
           fields: {},
           errorsmsg: {}
       }
	   
    }
	
handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
		//alert(fields.toSource());
	    
}
	

checkData(e){
        e.preventDefault();	
        //alert(errorsmsg.toSource());		
        if(this.handleValidation()){
		   var flag=0;
           var email                 = this.refs["email"];	
           var userName              = email.value;		   
           
           var pass                 = this.refs["pass"];	
           var userPassword         = pass.value;	    		   
	       var users = JSON.parse(localStorage.getItem('Users')) || [];
		   var index = 0
		   for (index = 0; index < users.length; ++index) {			   
             	//console.log(users[index].Email);
				//alert(users[index].Username+" "+userName);
			   if(users[index].Email==userName && users[index].Password==userPassword){
			    flag=1;
		     	alert("You have successfully Loggedin");
				  localStorage.setItem('UserName',users[index].Username);
		         //browserHistory.push('/dashboard');
			 
				 this.setState({
				  isLoggedIn: true
				  })

			 }			 
            }	
          if(flag==0){
			  alert("You have entered wrong credentials");
			  return false;
		  }			
		   
        }else{
           alert("Please provide correct credentials.");
        }
        
}

handleValidation(){	
        let fields = this.state.fields;
        let errorsmsg = {};
        let formIsValid = true;

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errorsmsg["name"] = "Cannot be empty";
        }

        if(typeof fields["name"] !== "undefined"){
        let lastAtPos = fields["name"].lastIndexOf('@');
        let lastDotPos = fields["name"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["name"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["name"].length - lastDotPos) > 2)) {
         formIsValid = false;
         errorsmsg["name"] = "Email is not valid";
         }
       }

        
		if(!fields["pass"]){
           formIsValid = false;
           errorsmsg["pass"] = "Cannot be empty";
        }
        //alert(errorsmsg.toSource());
		
		this.setState({errorsmsg: errorsmsg});
        return formIsValid;
}


   render() {
	    if (this.state.isLoggedIn) {
          return <Redirect push to='/app' />;
		}
      return (
         <div>     
            <h3> <center> Login Form </center> </h3>		 
            <form name="" method="post" onSubmit= {this.checkData.bind(this)}>		 
					    <input ref="email" type="email" size="30" id="email" placeholder="Email" value={this.state.fields["email"]} onChange={this.handleChange.bind(this, "email")} required/><br/>
						<span style={{color: "red"}}>{this.state.errorsmsg["email"]}</span><br/>
						
						<input ref="pass" type="password" size="30" id="password" placeholder="Password" value={this.state.fields["pass"]} onChange={this.handleChange.bind(this, "pass")} required/><br/>
						<span style={{color: "red"}}>{this.state.errorsmsg["pass"]}</span><br/>
						<button id="Login">Login</button><br/>
			   		   
             </form>  
             
         </div>
      );
   }
}
export default Login;