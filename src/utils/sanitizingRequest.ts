import { NextFunction, Request, Response } from "express";
import messages from "../constants/messages";
import {specialCharacter} from '../constants/regex'
import HttpException from "./HttpException";
export default async function  sanitizingRequest(req:Request,res:Response,next:NextFunction){
  
      if(!req.query.query){
        
        return next(HttpException.badRequest(messages['invalidRequest']));
          
      } 

    if(specialCharacter.test(req.query.query.toString())){
      
      return next(HttpException.badRequest(messages['invalidRequest']));
        
      } else {
        
         return   next()
      }
}