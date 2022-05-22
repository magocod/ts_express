import { StrategyOptions, Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { PassportStatic } from "passport";

import { User } from "../entity";
import { dataSourceFactory } from "../data_source";
import { IncomingHttpHeaders } from "http";

const AppDataSource = dataSourceFactory();

export const SECRET = "my-token-secret";

export function getToken(headers: IncomingHttpHeaders): string | null {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function setupJwtPassport(passport: PassportStatic): void {
  const opts: StrategyOptions = {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
  };
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      return AppDataSource.getRepository(User)
        .findOne({
          where: { email: jwt_payload.email },
        })
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error, false);
        });
    })
  );
}
