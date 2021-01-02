const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req, res){
  res.sendFile( __dirname + "/signup.html");
});

app.post("/" , function(req , res){

  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/a9cecc6858"
  const options = {
    method : "POST",
    auth : "Tejas1:2485813fcf2b34c407722ff9de54e852-us7"
  };

  const request = https.request(url , options , function(response){
    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data" , function(data){
      //console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();

})

app.post("/failure" ,function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000 , function(){
  console.log("Server is up and running at port 3000");
});

//api key
//2485813fcf2b34c407722ff9de54e852-us7

//List id
//a9cecc6858
