import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { DatabaseService } from '@shared/database/services/database.service';
import { FileService, FileTypes } from 'src/file/file.service';
import { ListenService } from 'src/listen/listen.service';

import { AddVideoToCoursDto } from './dtos/add-video-to-cours.dto';
import { UpdateVideoDto } from './dtos/update-video.dto';

@Injectable()
export class VideoService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly fileService: FileService,
    private readonly listenService: ListenService,
  ) {
    super(datasource);
  }

  async addVideoToCours(dto: AddVideoToCoursDto, userId: number, video) {
    const videoPath = this.fileService.createFile(FileTypes.VIDEO, video);
    const fromUser = await this.database.users.findOneOrFail({ where: { id: userId } });
    const toCours = await this.database.courses.findOneOrFail({
      where: { id: dto.toCoursId, userId },
    });
    return await this.database.videos.create({
      ...dto,
      video: videoPath,
      toCours,
      fromUser,
      userId,
    });
  }

  async deleteVideo(videoId: number, userId: number) {
    await this.database.videos.findOneOrFail({ where: { id: videoId, userId } });
    await this.database.videos.delete({ id: videoId });
    return true;
  }

  async updateVideo(dto: UpdateVideoDto, videoId: number, userId: number) {
    await this.database.videos.findOneOrFail({ where: { id: videoId, userId } });
    await this.database.videos.update({ id: videoId }, { ...dto });
    return true;
  }

  async getVideoById(videoId: number, userId: number) {
    await this.listenService.createListen(videoId, userId);
    const video = await this.database.videos.findOneOrFail({
      where: { id: videoId },
      relations: {
        fromUser: true,
        toCours: true,
        comments: {
          fromUser: true,
          comments: {
            fromUser: true,
          },
        },
      },
    });
    if (video.userId !== userId) {
      await this.database.buedCourses.findOneOrFail({
        where: { courseId: video.toCours.id, userId },
      });
    }
    return video;
  }
}
