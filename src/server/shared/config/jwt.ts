export const alg = 'RS256';

export const JWT_CONFIG ={
    encoding: 'utf8',
    // ggf. als DN (=distinguished name) gemaess LDAP
    issuer: 'https://hska.de/shop/BenediktBender',
    // Verstehe ich noch nicht
    secret: 'p',
    // 1 tag in sekunden
    expiration: 24 * 60 * 60, // eslint
    bearer: 'Bearer',

};