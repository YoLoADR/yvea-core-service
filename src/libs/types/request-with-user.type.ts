import { JWTPayload } from '@libs/interfaces';
import { Request } from 'express';

export type RequestWithUser = Request & { user: JWTPayload };
