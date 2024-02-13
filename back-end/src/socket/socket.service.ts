import { Injectable } from '@nestjs/common';
// import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SocketService {
  constructor(private prisma: PrismaService) {}
  async updateUserStatus(id: number, status: string) {
    try
    {
      await this.prisma.player.update({
        where: {
          id_player: id,
        },
        data: {
          status: status as any,
        },
      });
    }
    catch
    {
    }
  }
  async getFriends(userId: number) {
    try {
        const friends = await this.prisma.friendShip.findMany({
        where: {
          OR: [{ userId: userId }, { friendId: userId }],
          status: 'ACCEPTED',
        },
        include: {
          user: {
            select: {
              id_player: true,
              username: true,
              status: true,
            },
          },
          friend: {
            select: {
              id_player: true,
              username: true,
              status: true,
            },
          },
        },
      });
      return friends;
    } catch {
      throw new Error('Error getting friends');
    }
  }
}
