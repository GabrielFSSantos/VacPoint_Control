import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Administrator from '../models/Administrator';
import authConfig from '../config/auth';
import {connect, close} from '../database/index';

const AdministratorController = {

  async login(req: Request, res: Response) {
    try {

      connect()
      .then(() => console.log("Database connected!"))
      .catch(err => console.log(err));

      const administrator = await Administrator.findOne({
        email: req.body.email
      });

      if (!administrator) {
        return res.status(401).json({ error: 'Administrador not found.' });
      }

      if (!req.body.password || !await compare(req.body.password, administrator.password)) {
        return res.status(401).json({ error: 'Password invalid.' });
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, { subject: administrator.id, expiresIn });
      
      const response = {
        id: administrator._id,
        email: administrator.email,
        password: administrator.password,
        token
      };

      return res.json(response);

    } catch (error) {
      return res.status(400).json("Could not login.\n" + error);
    }
  },

  async logout(req: Request, res: Response) {
    try {

      close()
      .then(() => console.log("Database closed!"))
      .catch(err => console.log(err));

      return res.send("Database closed!");

    } catch (error) {
      return res.status(400).json("Could not login.\n" + error);
    }
  }
}

export default AdministratorController;