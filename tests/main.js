import assert from "assert";

describe("img_gallery", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "img_gallery");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
  if(Meteor.isServer){
    Meteor.startup(function(){
      if(Images.find().count()==0){
        Images.insert(
          {
            img_src:"1.jpg",
            img_alt:"image of nature1"
          }
        );
      }
    });
  } 
});
