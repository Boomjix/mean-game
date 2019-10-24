import { IncomingMessage, ServerResponse } from 'http';
import { logger } from './logger';
import { promisify } from 'util';
import { readFile } from 'fs';


// Abfrage ob ein Object ein String ist

export const isString = (obj: unknown) => typeof obj === 'string';

export const readFileAsync = promisify(readFile);

export const responseTimeFN: (
    req: IncomingMessage,
    res: ServerResponse,
    time:number,


) => void = (_,__, time) => logger.debug(`Response time: ${time} ms`);