import React from 'react';
import Login from './login.jsx';
import {Link} from 'react-router-dom';
class App extends React.Component {
constructor(props){
       super(props);

       this.state = {
		   type: '',
           fields: {},
           errors: {}
       }
	   
    }

handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
	    
}


contactSubmit(e){
        e.preventDefault();	
//alert(localStorage.getItem('Users').toSource());
//localStorage.clear();
         //getting records from local storage
		
        if(this.handleValidation()){
		   var users = JSON.parse(localStorage.getItem('Users')) || [];
           var name                 = this.refs["name"];	
           var userName             = name.value;		   
           var email                = this.refs["email"];	
           var userEmail            = email.value;	
           var pass                 = this.refs["pass"];	
           var userPassword         = pass.value;	    		   
	       var confirmpassword      = this.refs["confirm"];	
           var cpassword            = confirmpassword.value;		   
		   var index = 0;
		   //console.log(users.length);
		  
		   for (index = 0; index < users.length; ++index) {			   
             	console.log(users[index].Email);
			   if(users[index].Email==userEmail){
		     	alert("please use different email");
				return false;
			 }
            }
		   
		   
           var userData = {"Username":userName,
                           "Email":userEmail,
		                   "Password":userPassword};

           users.push(userData);
		   // setter for multiple user records
           localStorage.setItem('Users', JSON.stringify(users));
		   //console.log(localStorage.getItem('Users'));
		   // setter for one user record
           //localStorage.setItem('userName', userName);
		   //localStorage.setItem('pass', userPassword);
		   
           alert("You have successfully Registered");
		   
        }else{
           alert("Please provide proper information.");
        }

}

handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }

        if(typeof fields["name"] !== "undefined"){
             if(!fields["name"].match(/^[a-zA-Z]+$/)){
                 formIsValid = false;
                 errors["name"] = "Only letters";
             }          
        }

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Cannot be empty";
        }

        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }

      if(!fields["pass"]){
           formIsValid = false;
           errors["pass"] = "Cannot be empty";
        }
		//alert(fields["pass"].length);
	  if(fields["pass"].length<8){
           formIsValid = false;
           errors["passlength"] = "Password length should be greater than 8";
        }
		
	  if(!fields["confirm"]){
           formIsValid = false;
           errors["confirm"] = "Cannot be empty";
        }
	 if(fields.confirm){			
		if(fields.pass != fields.confirm){	
		   formIsValid = false;
		   errors["matchpass"]= "password and confirm password should match.";		   
		}
	   }	
	 //for(var i=0; i < localStorage.getItem('Users').length; i++){
		   //var userDetail=localStorage.getItem('Users');
			 //  if(fields["email"].value==localStorage.getItem('Users')[i].email)
			//	   alert("please use unique email id");
		   //}

       this.setState({errors: errors});
       return formIsValid;
   }

onLogin(){
	this.setState({
		type: 'login'
	})
}
   render() {
	   if(this.state.type == 'login'){
      return (
	  
			<Login/>
         );
	   }
	   else{
		   return (
			<div>     
            <h3> <center> Registration Form </center> </h3>		 
            <form name="" method="post" onSubmit= {this.contactSubmit.bind(this)}>		 
					    <input ref="name" type="text" size="30" placeholder="Name" value={this.state.fields["name"]} onChange={this.handleChange.bind(this, "name")} required/><br/>					    
						<span style={{color: "red"}}>{this.state.errors["name"]}</span><br/>
						<input ref="email" type="email" size="30" id="email" placeholder="Email" value={this.state.fields["email"]} onChange={this.handleChange.bind(this, "email")} required/><br/>
						<span style={{color: "red"}}>{this.state.errors["email"]}</span><br/>
						<input ref="pass" type="password" size="30" id="password" placeholder="Password" value={this.state.fields["pass"]} onChange={this.handleChange.bind(this, "pass")} required/><br/>
						<span style={{color: "red"}}>{this.state.errors["pass"]}</span><br/>
						<span style={{color: "red"}}>{this.state.errors["passlength"]}</span><br/>
						<input ref="confirm" type="password" id="confirm" size="30" placeholder="Confirm Password" value={this.state.fields["confirm"]} onChange={this.handleChange.bind(this, "confirm")} required/><br/>
						<span style={{color: "red"}}>{this.state.errors["confirm"]}</span><br/>
						<span style={{color: "red"}}>{this.state.errors["matchpass"]}</span><br/>
						<button id="send">Register</button><br/>
			   		   
             </form>  
			 <span onClick={this.onLogin.bind(this)}><Link to='/login'>Login</Link></span>
         </div>
		 
      
		   )
	   }
   }
}




export default App;

