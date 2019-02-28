import React, {Component} from 'react';
import { mount } from 'react-mounter';

import {AuthLayout} from '/imports/layouts/authLayout.jsx';
// import {AnonymousLayout} from '/imports/layouts/authLayout.jsx';

import EmpBasicInfo from "/imports/empInduction/EmpBasicInfo/EmpBasicInfo.jsx";
import EmpProfile from "/imports/empInduction/EmpBasicInfo/EmpProfile.jsx";
import EmpList from "/imports/empInduction/EmpBasicInfo/EmpList.jsx";
import EmpLogin from "/imports/empInduction/EmpBasicInfo/EmpLogin.jsx";


FlowRouter.route('/signup', {
    action: function() {
        mount(AuthLayout,{main: (<EmpBasicInfo />)});
    }
});
FlowRouter.route('/empLogin', {
    action: function() {
        mount(AuthLayout,{main: (<EmpLogin />)});
    }
});
FlowRouter.route('/empInfo/:empid', {
    action: function() {
        mount(AuthLayout,{main: (<EmpBasicInfo />)});
    }
});

FlowRouter.route('/empProfile/:empid', {
    action: function() {
        mount(AuthLayout,{main: (<EmpProfile />)});
    }
});

FlowRouter.route('/empList', {
    action: function() {
        mount(AuthLayout,{main: (<EmpList />)});
    }
});