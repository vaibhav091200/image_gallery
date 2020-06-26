import {mongo} from 'meteor/mongo';
export const Images = new Mongo.Collection("images");

//------------------------------------------------------------set up security on Images collection------------------------------------------
Images.allow({
	insert:function(userId, doc){
		if(Meteor.user()){//are they logged in?
			console.log(doc);//show details in server of the image inserted
			if(doc.created_by != userId){
				return false;
			}
			else{
				return true;
			}
		}
		else{
			return false;
		}
	},
	remove: function(userId, doc){
		return true;
	}
});