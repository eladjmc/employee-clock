import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../errors/api-error';
import { TokenPayloadDto } from '../dto/token-payload.dto';

export function authenticateJWT(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApiError(401, 'No authorization header provided');
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    throw new ApiError(401, 'Invalid authorization header format');
  }

  try {

    const secretKey:string | undefined = process.env.JWT_SECRET;
    if(!secretKey){
        throw new Error("No JWT secret key")
    }
    
    const payload = jwt.verify(token, secretKey) as TokenPayloadDto;
    // Attach user data to the request object for further usage
    (req as any).user = payload;
    next();
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired token');
  }
}

// Helper to ensure the user has a specific role (for us its basically Manager or Employee right now)
export function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !allowedRoles.includes(user.role)) {
      throw new ApiError(403, 'Forbidden: Insufficient permissions');
    }
    next();
  };
}
