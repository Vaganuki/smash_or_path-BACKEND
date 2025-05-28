import {Router} from "express";
import {profilRouter} from "./profil.router";

export const routes = Router()
    .use('/profil', profilRouter);