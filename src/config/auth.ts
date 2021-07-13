import { StrategyOptions, Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { PassportStatic } from "passport";

// load up the user model
import User from "../models/user";

export const secret = "nodeauthsecret";

/**
 *
 * @param headers
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getToken(headers: any): string | null {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default function handlePassport(passport: PassportStatic): void {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done): Promise<void> => {
      try {
        const user = await User.find(jwt_payload.id);
        done(null, user);
      } catch (e) {
        return done(e, false);
      }
    })
  );
}
