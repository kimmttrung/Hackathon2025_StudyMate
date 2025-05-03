import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); // cau hinh public
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}
module.exports = configViewEngine;