// update to redis
import { IRateLimiterOptions, RateLimiterMemory } from "rate-limiter-flexible";
import { NextFunction, Request, Response, Handler } from "express";

const opts: IRateLimiterOptions = {
  points: 10, // points
  duration: 1, // Per second
};

const isolatedOpts: IRateLimiterOptions = {
  points: 100, // points
  duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

export async function rateLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // console.log(req.ip);
    await rateLimiter.consume(req.ip);
    next();
  } catch (e) {
    console.log(e);
    return res
      .status(429)
      .json({ message: "Too Many Requests", error: "Too Many Requests" });
  }
}

export function isolatedRateLimiterMiddleware(): Handler {
  const limiter = new RateLimiterMemory(isolatedOpts);
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.ip);
      await limiter.consume(req.ip);
      next();
    } catch (e) {
      console.log(e);
      return res
        .status(429)
        .json({ message: "Too Many Requests", error: "Too Many Requests" });
    }
  };
}
