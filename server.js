const express = require("express");
const db = require("./models");
const app = express();

app.use(express.urlencoded({extended: false}));
//ROUTE 1
app.get("/", (req,res) => {
	res.send("Home");
});

app.get("/countries", (req,res) => {
	db.country.findAll().then(function(countries){
		res.json(countries);
	}).catch(err => {
		console.log(err)
		res.send("ERROR");
	});
});

app.get("/countries/:name", (req,res) => {
	db.country.findOne({
		where: {
			name: req.params.name
		}
	}).then(function(country){
		console.log("country");
		res.json(country);
	}).catch(err => {
		console.log(err);
		res.send("ERROR");
	});
	//res.send("Show one countries");
});

app.post("/countries", (req,res) => {
	console.log(req.body);
	db.country.findOrCreate({
		where: {
			name: req.body.name
		},
		defaults: {
			name: req.body.name,
			population: req.body.population,
			code: req.body.code
		}
	}).then(function([country, created]){
		if(created){
			console.log(`Created ${country.name}`);
		} else {
			console.log(`Found ${country.name}`);
		}
		res.redirect(`/countries/${country.name}`);
	}).catch(err => {
		console.log(err);
		res.send("ERROR");
	});
})

app.put("/countries/:id", (req,res) => {
	db.country.update({
		name: req.body.name,
		population: req.body.population,
		code: req.body.code
	},{
		where: {
			name: req.body.name
		}
	}).then(function(updated) {
		if(updated){
			console.log("Successful update")
			res.redirect(`/countries/${req.body.name}`)
		}
	}).catch(err => {
		console.log(err);
		res.send("ERROR");
	});
})

app.delete("/countries/:name", (req,res) => {
	db.country.destroy({
		where: {
			name: req.params.name
		}
	}).then(function(numDeleted){
		console.log(numDeleted);
		res.redirect("/countries");
	}).catch(err => {
		console.log(err);
		res.send("ERROR");
	});
})

app.listen(8000, () => console.log(`📡 listening on 8000 📡`));










app.listen(3000, () => console.log(`📡 listening to port 3000`));