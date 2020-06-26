// ---------------------------------------------- importing files ----------------------------------------------------
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Meteor} from 'meteor/meteor';
import './main.html';
import {Images} from '/lib/collection.js';

window.Images = Images;

//----------------------------------------------accounts configuration ------------------------------------------------
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
})


//--------------------------------------------- routing configuration --------------------------------------------------
Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

//--------------------------------------------- routes -----------------------------------------------------------------
Router.route('/', function () {
	this.render('navbar',{to:"navbar"});
  	this.render('welcome',{to:"addimg"});
  	this.render('img_add_form',{to:"main"});	
});


Router.route('/images', function () {
  this.render('navbar',{to:"navbar"});
  this.render('img_add_form',{to:"addimg"});
  this.render('images',{to:"main"});
});


Router.route('/single_image/:_id', function () {
  this.render('navbar',{to:"navbar"});
  this.render('single_image',
  	{to:"main",
  		data:function(){
  			return Images.findOne({_id:this.params._id});
  		}
  });
});

//------------------------------------------------ template helpers -----------------------------------------------------
Template.welcome.helpers({
	username:function(){
		if(Meteor.user())
		{
			return "Hi " + Meteor.user().username;
		}
		else
		{
			return "Please Login";
		}
	}
});


Template.images.helpers({
	images: function(){
		if(Session.get("userFilter")){
			return Images.find({created_by:Session.get("userFilter")},{sort:{created_on:-1}});
		}
		else{
			return Images.find({},{sort:{created_on:-1}});
		}
	},
	getUser: function(user_id){
		var user = Meteor.users.findOne({_id:user_id});
		if(user){
			return user.username;
		}
		else{
			return "unknown";
		}
	},
});


Template.img_add_form.helpers({
	filtering_images: function(){
		if(Session.get("userFilter")){
			return true;
		}
		else {
			return false;
		}
	},
	getFilterUser: function(){
		if(Session.get("userFilter")){
			var user = Meteor.users.findOne({_id:Session.get("userFilter")});
			return user.username;
		}
		else{
			return false;
		}
		
	}
});


//--------------------------------------------------------------- template events ---------------------------------------------------------


Template.images.events({
	'click .js-onclick': function(event)
	{
		$(event.target).css("width", "50px");
	},
	'click .js-del-image': function(event) {
		var image_id = this._id;
		console.log(image_id);
		$("#"+image_id).hide('slow',function(){
			Images.remove({"_id":image_id});
		})
	},
	'click .js-set-image-filter': function(event){
		Session.set("userFilter",this.created_by);
	}
});


Template.img_add_form.events({
	'submit .js-add-img': function(event){
		var img_src,img_alt;
		img_alt = event.target.img_alt.value;
		img_src = event.target.img_src.value;
		console.log("img_src is "+img_src+"and img_alt is "+img_alt);
		if(Meteor.user()){
			Images.insert(
				{
					img_src: img_src,
					img_alt: img_alt,
					created_on: new Date(),
					created_by: Meteor.user()._id
				}
			);
		}

		return false;
	},
	'click .js-remove-image-filter': function(){
		Session.set("userFilter",undefined);
	}
});
