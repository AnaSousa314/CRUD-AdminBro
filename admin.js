//##################
// Database
const mongoose = require("mongoose");

/* cria o modelo do banco de dados */
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    completed: Boolean,
    created_at: { type: Date, default: Date.now },
});
const Project = mongoose.model("Project", ProjectSchema, "Project")

//##################
// Admin Bro
const AdminBro = require('admin-bro');

const AdminBroExpress = require('@admin-bro/express');

const AdminBroMongoose = require("@admin-bro/mongoose");

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose);

// config
/* middleware */
const adminBroOptions = new AdminBro({
    //databases:[],
    resources:[Project],
    rootPath: "/admin"
});


const router = AdminBroExpress.buildRouter(adminBroOptions);

// ##############
// Server
const express =  require("express");
const server = express();

server.use(adminBroOptions.options.rootPath, router);

/* inicia primeiro a conexão com o banco de dados */
const run = async ()=>{
    await mongoose.connect("mongodb://localhost/adminbroapp",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    await server.listen(5500, ()=> console.log("Server started"));
}

run();