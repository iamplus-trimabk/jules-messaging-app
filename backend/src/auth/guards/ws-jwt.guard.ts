import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  private logger: Logger = new Logger('WsJwtGuard');

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    try {
      const authToken = client.handshake?.headers?.authorization?.split(' ')[1];
      if (!authToken) {
        throw new WsException('Unauthorized: No token provided');
      }

      const payload = await this.jwtService.verifyAsync(authToken);
      // Attach the user payload to the socket object
      client.handshake['user'] = { userId: payload.sub, mobileNumber: payload.mobileNumber };
      return true;
    } catch (err) {
      this.logger.error(err.message);
      client.disconnect(); // Force disconnect on auth error
      return false;
    }
  }
}
