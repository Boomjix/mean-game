import * as validator from 'validator';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from './httpStatus';
import { inspect } from 'util'; // gleiche wie shared ( vgl Kotlin)
import { logger } from './logger';

class SharedRequestHandler {
    private static readonly SPACE = 2;

    logRequestHeader(req: Request, _: Response, next: NextFunction) {
      logger.debug(
            `Request: headers=${JSON.stringify(
                req.headers,
                undefined,
                SharedRequestHandler.SPACE,
        )}`,
    );
    logger.debug(
        `Request: protokoll=${JSON.stringify(
            req.protocol,
            undefined,
            SharedRequestHandler.SPACE,
        )}`,
    );    
    logger.debug(
        `Request: hostname=${JSON.stringify(
            req.hostname,
            undefined,
            SharedRequestHandler.SPACE,
        )}`,
    );

if (req.body!== undefined) {
    logger.debug(
        `Request: body=${JSON.stringify(
            req.body,
            undefined,
            SharedRequestHandler.SPACE,
        )}`,
    );
}
Object.keys(req).forEach(key => {
    if(Object.prototype.hasOwnProperty.call(req,key)) {
        logger.log(`silly`,`Request-Key: ${key}`);
    }
});

// Fortsetzung der Request-Verarbeitung
next();

}

validateUUID(_:Request, res: Response, next: NextFunction, id: any) {
    if(validator.isUUID(id)) {
        logger.debug('SharedRequestHandler.validateUUID(): isUUID');
        next();
        return;
    }

    logger.debug('SharedRequestHandler.validateUUID(): status=BAD_REQUEST');
    res.status(HttpStatus.BAD_REQUEST).send(
        `${id} ist keine gueltige Spiele-ID`,
    );
    
}

validateContentType(req: Request, res: Response, next: NextFunction) {
    const contentType = req.header('Content-Type');
    if (contentType === undefined || validator.isMimeType(contentType)) {
        logger.debug('SharedRequestHandler.validateContentType(): ok');
        next();
        return;
    }

    logger.debug(
         'SharedRequestHandler.validateContentType(): status=BAD_REQUEST',
    );
    res.status(HttpStatus.BAD_REQUEST).send(
        `${contentType} ist kein gueltiger MIME-Typ`,
    );
}

notFound(_: Request, res: Response) {
    res.sendStatus(HttpStatus.NOT_FOUND);
}

internalError(err: any,_: Request, res: Response) {
    logger.error('SharedRequestHandler.notYetImplemented()');
    res.sendStatus(HttpStatus.NOT_YET_IMPLEMENTED);
}lllll
