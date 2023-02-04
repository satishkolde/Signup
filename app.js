const express = require("express")
const app = express();
const https = require("https")


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.post("/",(req,res)=>{
    console.log(req.body);
    let fname = req.body.first_name;
    let lname = req.body.last_name;
    let email = req.body.user_mail;

    const url = "https://us10.api.mailchimp.com/3.0/lists/59adb932d0";

    data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    }

    let jsondata = JSON.stringify(data);
    let options = {
        method:"POST",
        auth:"satish:ca4655a03c0062549daad8086b5f1843-us10"
    }

    const request = https.request(url,options,(response)=>{

        if(response.statusCode >= 200 && response.statusCode<300){
            res.sendFile(__dirname+'/success.html');
        }else{
            res.sendFile(__dirname+'/failure.html');
        }

        response.on("data",(dataT)=>{
            console.log("Data received")
            console.log(JSON.parse(dataT));
        })
    })

    request.write(jsondata);
    request.end()

})



app.listen(3000,()=>{
    console.log("Server is running on 3000")
})

// API KEY
// ca4655a03c0062549daad8086b5f1843-us10

// List Id
// 59adb932d0