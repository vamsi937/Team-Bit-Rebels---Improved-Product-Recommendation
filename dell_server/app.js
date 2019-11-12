const express=require('express');
const bodyParser=require('body-parser');
const http=require('http');
const https=require('https');
const session= require('express-session');
const ejs=require("ejs");
const nodemailer=require('nodemailer');
const app=express();

http.createServer(app).listen(8080);
const mongoose = require('mongoose');
const db="mongodb://vamsi123:vamsi123@ds115664.mlab.com:15664/confession";
mongoose.connect(db, { useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log('MongoDb Connected'))
.catch(err => console.log(err));
const dellLaptopSchema=new mongoose.Schema({
	model:String,
	url:String,
	label:Number,
	name:String
  });
  
const userSchema=new mongoose.Schema({
	name:String,
	email:String,
	password:String,
	age:Number,
	type:String
})  
  // const Laptop=mongoose.model("Laptop",contSchema);
const dLaptop=mongoose.model("Laptop",dellLaptopSchema,"dLaptop");
const dUser=mongoose.model("dUser",userSchema,"dUser");
var jsonParser = bodyParser.json({limit:'10mb'});
var urlencodedParser = bodyParser.urlencoded({ extended: false,limit:'10mb'});

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}));
app.use(session({ secret: 'keyboard cat'}));
app.use('/', express.static('public'));

function mailSend(recEmail){
	// console.log("Hello from Mailsend");
	var transporter = nodemailer.createTransport( {
	  service: 'gmail',
	  auth: {
		user: 'konchadavamsikrishna937@gmail.com',
		pass: 'vamsi@123'
	  }
	});
	
	var mailOptions = {
	  from: 'konchadavamsikrishna937@gmail.com',
	  to: recEmail,
	  subject: 'Enabling Dell Extension',
	  text: 'Thank You for enabling the dell extension.We hope to serve you well'
	};
	
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
  }

app.get('/',(req,res)=>{
    // res.redirect('/b');
	res.send('hello from root route')
});

let pylabel=0;
let laptops={
	list:[]
};

app.get('/',(req,res)=>{
	res.send('Hello');
})

// app.get('/login',(req,res)=>{

// })
app.get('/signup',(req,res)=>{
	res.render('signup');
  })
  
  app.post('/signup',(req,res)=>{
	dUser.find({email:req.body.email,name:req.body.name},(err,user)=>{
	   var newuser=new dUser(req.body);
	  if(err){
		conosle.log(err);
		res.redirect('/signup');
	  }else{
		 if(user.length==0){
		  newuser.save(function(error,newone){
			if(error){
			  console.log("internal error occured while saving about user in database");
			  res.redirect('/signup');
			}else{
			  console.log("User data saved successfully");
			  mailSend(req.body.email);
			  console.log(newone);
			  res.redirect('/login');
			}
		  })
		}else{
		  console.log("User id already taken with the project");
		  res.redirect('/signup');
		}
	  }
	})
  });

app.get('/login',(req,res)=>{
	res.render('login');
});
    
app.post('/login',(req,res)=>{
	dUser.find({email:req.body.email},(err,user)=>{
	  if(err){
		console.log(err);
		res.send('error')
	  }
	  else{
		if(user.length==0){
		  console.log("userid is not registered");
		  res.redirect('/signup');  
		}else{
		//   console.log(user);
		  if(user[0].password!=req.body.password){
			
			console.log("enter the correct password");
			res.redirect('/login');
		  }
		  else{
		  // console.log(user[0]);
		  req.session.udetails=user[0];
		//   console.log(req.session.udetails);
		  console.log("User successfully logged in");
		  res.redirect('/');          
		  }
		}
	  }
	})
  });
  

  app.get('/success',(req,res)=>{
	  res.send('You have successfully logged in');
  })

app.post('/name', callName); 

function callName(req, res) { 
	
	console.log(req.body);
	var a=req.body;
	console.log('below name route');
	var spawn = require("child_process").spawn; 
	
	// // Parameters passed in spawn - 
	// // 1. type_of_script 
	// // 2. list containing Path of the script 
	// // and arguments for the script 
	var process = spawn('python',["./app.py", 
							a.war,a.screen,a.cpu,a.ram,a.gpu,a.os,a.weight,a.price,a.category]); 
	// // // Takes stdout data from script which executed 
	// // // with arguments and send this data to res object 
	process.stdout.on('data', function(data) {  
		// console.log(data.toString());
		dLaptop.find({label:data.toString()},(err,laptop)=>{
			if(err){
				console.log(err);
				res.json({list:err});
			}else{
				// console.log(req.session.udetails);
				res.json({list:laptop,category:'Programmer'});
			}	
		})
	}) 
} 

app.get('/display',(req,res)=>{	
	console.log(pylabel+' in the display route');
})

app.post('/show',(req,res)=>{
	res.send(laptops);
})

app.get('/show',(req,res)=>{
	res.send(laptops);
})


app.listen(3000,()=>{
    console.log('Server started on port 3000');
})