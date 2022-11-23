const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){ 
const firstName = req.body.fname;
   const  lastName = req.body.lname;
   const  Email = req.body.email;
   const data = {
    members:[
        {
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
   };
   const jsonData = JSON.stringify(data);
   const url= "https://us11.api.mailchimp.com/3.0/lists/ae2e84d982";
   const options= {
    method:"POST",
    auth:"thor447:5df2af02a445b02d0c89548647a557be-us11"
   };
   const request = https.request(url,options,function(respond){
       respond.on("data",function(data){
        const jData = JSON.parse(data);
        console.log(jData);
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
       })
   });
   request.write(jsonData);
   request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
});
//API = 5df2af02a445b02d0c89548647a557be-us11
// audience id= ae2e84d982









app.listen(3000,function(){
    console.log("server is running at port 3000");
});