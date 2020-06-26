import { Meteor } from 'meteor/meteor';
import {Images} from '/lib/collection.js';


//------------------------------------------------------------ startup code ------------------------------------------------------------

Meteor.startup(() => {

  	// code to run on server at startup
  	console.log("I am the server");

	if(Images.find().count()==0){
		for(var i=1;i<=10;i++){
			Images.insert(
				{
					img_src: i+".jpg",
					img_alt:"image "+i
				}
			);
		}
	}

});
