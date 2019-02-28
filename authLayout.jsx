import React, {Component} from 'react';
import Header from "/imports/common/Header/Header.jsx";
import Footer from "/imports/common/Footer/Footer.jsx";
import Sidebar from "/imports/common/Sidebar/Sidebar.jsx";

export const AuthLayout = ({main})=>(
	<div className="container-fluid">
		<div className="row">
			 
				
			
			<div className="col-lg-6 col-md-8 col-sm-10 col-xs-12 col-lg-offset-3"> 
					<div className="contentWrapper col-lg-12">
						{main}
					</div>
			</div>
			

		</div>
	</div>
);