import { PrismaClient } from "@prisma/client";
import express, { RequestHandler, Express } from "express";
import { authenticationMiddleware } from "../middleware/authentication";
import { Route } from "../types";

export const controller =
  (name: string, routes: Route[]) => (app: Express, client: PrismaClient) => {
    const router = express.Router();
    routes.forEach((route) => {
      if (!route.skipAuth) {
        router.use(route.path, (req, res, next) => {
          if (req.method.toLowerCase() === route.method) {
            authenticationMiddleware(req, res, next);
          } else {
            next();
          }
        });
      }
      router[route.method](route.path, route.endpointBuilder(client));
    });
    app.use(`/${name}`, router);
  };
