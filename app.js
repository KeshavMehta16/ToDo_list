//avoid using var keyword because it breaks the concept of block scoping in case looping and contrl flow sratements
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));       //public folder is made to access static files like css, images, audios etc...

app.set("view engine" , "ejs");

// var item = "";
const items = ["buy food" , "cook food" , "eat food"];   //it is possible to push items in const array in javascript but can't assign it to a new array like workItems = ["text me"]
const workItems = [];

app.get("/" , function(req,res){
    // var today = new Date();
    //var day = "";
    // 1st way:
    // if(today.getDay() === 6 || today.getDay() === 0){
    //     day = "Weekend";
    //     // res.render("list" , {hue : day});
    // }else{
    //     day = "Weekday"
    //     // res.render("list" , {hue : day});
    // }

    //2nd way:
    // switch (today.getDay()) {
    //         case 0:
    //             day = "Sunday";
    //             break;
    //         case 1:
    //             day = "Monday";
    //             break;
    //         case 2:
    //             day = "Tuesday";
    //             break;
    //         case 3:
    //             day = "Wednesday";
    //             break;
    //         case 4:
    //             day = "Thursday";
    //             break;
    //         case 5:
    //             day = "Friday";
    //             break;
    //         case 6:
    //             day = "Saturday";
    //             break;
            
    //     default:
    //         console.log("error");
    //         break;
    // }

    //3rd way:
    // let options = {
    //     weekday: "long",
    //     day: "numeric",
    //     month: "long"
    // };
    // let day = today.toLocaleDateString("en-US" , options);
    // res.render("list" , {hue : day , newListItem : item});
    // let day = date.getDate();
    let day = date.getDay();
    res.render("list" , {listTitle : day , newListItems : items});

})

app.post("/" , function(req,res){
    //1st way to pass item
    //item = req.body.newItem;                        
    // yaha isko var item = req.body.newItem nahi likh skte kyuki jb render krna hota toh sbhi processes ko ek sath likhna hota as in line 56, toh agar var use krke likhenge to scope ki dikkat aegi...isliye var item ="" ko globally declare krdiya
    //2nd way:
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work" , function(req,res){
    res.render("list" , {listTitle: "Work List" , newListItems : workItems});
})

// app.post("/work" , function(req,res){
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// })

app.get("/about" , function(req,res){
    res.render("about");
})
app.listen(3000 , function(){
    console.log("server is running on port 3000");
})