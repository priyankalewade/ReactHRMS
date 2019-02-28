import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'



import { EmpMaster } from '/imports/empInduction/EmpBasicInfo/empMaster.js';
import "./empBasicinfo.css";

 const responseFacebook = (response) => {
 		 console.log(response);
	}

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
			"firstName": "",
			"lastName": "",
			"email": "",
			"phone": "",
			"password":"",
			"cpassword":"",
		};		

	}

  componentWillReceiveProps(nextProps) {
  	if(!nextProps.loading){
      if(nextProps.oneEmpData){
		    this.setState({
		        "firstName" 	: nextProps.oneEmpData.firstName,	        
		        "lastName" 		: nextProps.oneEmpData.lastName,	        
		        "email" 		: nextProps.oneEmpData.email,	        
		        "phone" 		: nextProps.oneEmpData.phone,	        
		        "password"      : nextProps.oneEmpData.password,
		        "cpassword"		: nextProps.oneEmpData.cpassword,
		    });
		  }
		}
	}


	submitBasicInfo(event){
		event.preventDefault();
		var formValues = {
			firstName 	: this.refs.firstName.value,
			lastName 	: this.refs.lastName.value,
			email 		: this.refs.email.value,
			phone 		: this.refs.phone.value,
			password 	: this.refs.password.value,	
			cpassword 	: this.refs.cpassword.value,	

		};
		var regEmail=/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

		if(this.state.action == "Submit"){

			if( formValues.firstName!=="" && formValues.lastName!=="" && formValues.email!=="" && formValues.phone!=="" && formValues.password!=="" && formValues.cpassword!=="")
			{
				if(formValues.password===formValues.cpassword)
				{
				Meteor.call("insertBasicInfo",formValues,
											(error,result)=>{
												if(error){
													console.log("Something went wrong! Error = ", error);
												}
												else{
													swal("Congrats!","Your Information Submitted Successfully.","success");
													console.log("latest id = ",result);
													FlowRouter.go("/empLogin/");
												}
											});	
				}
				else{
					swal("Password Does not Match...! and Mobile Number should be Numeric","","Warning");

				}
			}
			else{
				swal("No Field should be empty...!","","Warning");
			}
		}else{
			formValues._id = this.state.empId;
			Meteor.call("updateBasicInfo",formValues,
										(error,result)=>{
											if(error){
												console.log("Something went wrong! Error = ", error);
											}else{
												swal("Congrats!","Employee Profile Updated Successfully.","success");
												console.log("latest id = ",result);
												FlowRouter.go("/empProfile/"+this.state.empId);
												// FlowRouter.go("");
											}
										});	
		}

	}

	handleChange(event){
		event.preventDefault();
    this.setState({
        "firstName" 	: this.refs.firstName.value,	        
        "lastName" 		: this.refs.lastName.value,	        
        "email" 		: this.refs.email.value,	        
        "phone" 		: this.refs.phone.value,	        
        "password" 		: this.refs.password.value,	        
        "cpassword" 	: this.refs.cpassword.value,	        
    });

	}
	


	checkNumber = (event) => {
		// event.preventDefault();
		var charCode=event.keyCode;
		console.log(charCode);
  	
  		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  			console.log(charCode);

		event.preventDefault();
        }
        else{
			return false;}
	}
	

	render(){
		

		
		return (
			<div className="row">
		    
					<form className="col-lg-12 formcontainer">
						<h3> Sign Up </h3> 
						<h5>Please fill form to Sign Up</h5>
		    			<hr/>
						<div className="col-lg-12">	
					    	<div className="form-group col-lg-6 col-md-4 col-sm-6">
					    		<div className="input-group">
					    			<span className="input-group-addon"><i className="fa fa-user"></i></span>
						    		<input type="text" placeholder="First Name" value={this.state.firstName} ref="firstName" className="form-control" onChange={this.handleChange.bind(this)} />

						    	</div>
					    	</div>
					    	<div className="form-group col-lg-6 col-md-4 col-sm-6">
					    		<div className="input-group">
						    		<span className="input-group-addon"><i className="fa fa-user"></i></span>
						    		<input type="text"  placeholder="Last Name" value={this.state.lastName} ref="lastName" className="form-control"  onChange={this.handleChange.bind(this)} />
						    	</div>
					    	</div>
				    	</div>	

						<div className="col-lg-12">	
					    	<div className="form-group col-lg-12 col-md-4 col-sm-4 col-xs-12 ">
					    		<div className="input-group">
						    		<span className="input-group-addon"><i className="fa fa-envelope"></i></span>
						    		<input type="email"   placeholder="Email" value={this.state.email} ref="email" className="form-control"  onChange={this.handleChange.bind(this)} />
						    	</div>
					    	</div>
					    	<div className="form-group col-lg-12 col-md-4 col-sm-4 col-xs-12">
					    		<div className="input-group">
						    		<span className="input-group-addon"><i className="fa fa-phone"></i></span>
						    		<input type="tel"  placeholder="Mobile Number" value={this.state.phone} ref="phone" className="form-control" onKeyDown={this.checkNumber.bind(event)} onChange={this.handleChange.bind(this)} />
						    	</div>
					    	</div>
					    	<div className="form-group col-lg-12 col-md-4 col-sm-4 col-xs-12">
					    		<div className="input-group">
						    		<span className="input-group-addon"><i className="fa fa-lock"></i></span>
						    		<input type="Password"  placeholder="Password" value={this.state.password} ref="password" className="form-control"  onChange={this.handleChange.bind(this)} />
						    	</div>
					    	</div>
					    	<div className="form-group col-lg-12 col-md-4 col-sm-4 col-xs-12">
					    		<div className="input-group">
						    		<span className="input-group-addon"><i className="fa fa-lock"></i></span>
						    		<input type="Password"  placeholder="Confirm Password " value={this.state.cpassword} ref="cpassword" className="form-control"  onChange={this.handleChange.bind(this)} />
						    	</div>
					    	</div>
				    	</div>	

						<div className="col-lg-12 ">	
								<button className="col-lg-3 butto pull-right" onClick={this.submitBasicInfo.bind(this)}> Sign Up </button>
								<div class="col-lg-1 regi">
									<span className="signredirect pull-right">Already Registered...<a href="/empLogin" className="">Sign In</a></span>
								</div>
						</div>
						<hr/>
						<div className="socialMediaLogin col-lg-12">
							<div className="col-lg-10 col-lg-offset-2">
								<button className="col-lg-2 btn-primary socialbtn" id ="demo"><i className="fa fa-facebook-f"></i></button>
								<button className="col-lg-2 btn-primary socialbtn"><i className="fa fa-twitter"></i></button>
								<button className="col-lg-2 btn-error socialbtn"><i className="fa fa-google"></i></button>
								<button className="col-lg-2 btn-primary socialbtn"><i className="fa fa-linkedin"></i></button>
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