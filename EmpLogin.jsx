import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';


import { EmpMaster } from '/imports/empInduction/EmpBasicInfo/empMaster.js';
import "./empBasicinfo.css";


class EmpBasicInfo extends Component{
	constructor(props){
		super(props);
		var urlEmpId = FlowRouter.getParam("empid");
		if(urlEmpId){
			var action = "Update";
		}else{
			var action = "Submit";
		}


		this.state = {
			"empId" : urlEmpId,
			"action" : action,
			"email": "",
			"password":"",
		};		

	}

  componentWillReceiveProps(nextProps) {
  	if(!nextProps.loading){
      if(nextProps.oneEmpData){
		    this.setState({
		        "email" 	: nextProps.oneEmpData.email,	        
		        "password"  : nextProps.oneEmpData.password,
		    });
		  }
		}
	}


	submitBasicInfo(event){
		event.preventDefault();
		var formValues = {
			userName 	: this.refs.email.value,
			password 	: this.refs.password.value,	

		}
		Meteor.call("validateUser",formValues,
											(error,result)=>{
												if(error){
													console.log("Something went wrong! Error = ", error);
												}
												else{
													swal("Congrats!","Your Your logged in.","success");
													console.log("latest id = ",result);
													if(result==true)
													{
														swal("Congrats!","Your Your logged in.","success");
														FlowRouter.go("/empProfile/"+result);
													}	
													else{
														swal("Ooooops!","Something Went Wrong.....","Warning");

													}
												}
					});	
		
	}

	handleChange(event){
		event.preventDefault();
    this.setState({
        "email" 	: this.refs.email.value,	                 
        "password" 	: this.refs.password.value,	        
    });


	}

	redirectSignUp(event){
		event.preventDefault();
		FlowRouter.go("/signup");

	}


	render(){
		
		return (
			<div className="row">
				<div className="col-lg-12 userLogo">
					<div className="userLogoimg col-lg-4 col-lg-offset-4">
					</div>

				</div>
		    	<h3 className="col-lg-offset-1 centerText"> Employee Login Form </h3> 
		    	<hr/>

					<form className="col-lg-12 col-lg-offset-1 formcontainer">
						<div className=" col-lg-12">	
					    	<div className="form-group col-lg-10 col-md-4 col-sm-6">
					    		<label>Username</label>
					    		<div className="input-group">
						    		<span className="input-group-addon"><i className="fa fa-user"></i></span>
						    		<input type="text" placeholder="Enter Your Email..." ref="email" className="form-control" onChange={this.handleChange.bind(this)} />
						    	</div>
					    	</div>
					    	<div className="form-group col-lg-10 col-md-4 col-sm-6">
					    		<label>Password</label>
					    		<div className="input-group">
						    		<span className="input-group-addon"><i className="fa fa-lock"></i></span>
						    		<input type="password" placeholder="Enter Password"  ref="password" className="form-control" onChange={this.handleChange.bind(this)}  />
						    	</div>
					    	</div>
					    	


							<div className="col-lg-12">	
								<button className="col-lg-3 btn btn-primary " onClick={this.submitBasicInfo.bind(this)}> LOGIN  </button>
								<button className="col-lg-3 btn btn-primary col-lg-offset-1 " onClick={this.redirectSignUp.bind(this)}> Sign UP  </button>
								<a href="" className=" col-lg-offset-1 col-lg-1">Forgot Password</a>
							</div>
							</div>		    	
					</form>			
		    </div>
		);
	};
}


export default withTracker(()=>{
	if(FlowRouter.getParam("empid")){
		var urlEmpId = FlowRouter.getParam("empid");
	}else{
		var urlEmpId = 0;
	}
	var empSub = Meteor.subscribe("empData",urlEmpId);

	const oneEmpData = EmpMaster.findOne({})||{};
	// console.log("oneEmpData = ",oneEmpData);

	return {
		"loading" : !empSub.ready(),
		"oneEmpData" 	: oneEmpData,
	}

})(EmpBasicInfo);