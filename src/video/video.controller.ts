import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { VideoService } from './video.service';
import { CurrentUser } from 'src/auth/decorators/curentUser';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { AddVideoToCoursDto } from './dtos/add-video-to-cours.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateVideoDto } from './dtos/update-video.dto';

@UseGuards(JwtAuthGuard)
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  addVideoToCours(
    @CurrentUser('id') userId: number,
    @Body() dto: AddVideoToCoursDto,
    @UploadedFile() files: { video?: Express.Multer.File[] },
  ){
    return this.videoService.addVideoToCours(dto, userId, files);
  }

  @Delete(':id')
  deleteVideo(@CurrentUser('id') userId: number, @Param('id') id: number){
    return this.videoService.deleteVideo(id, userId);
  }

  @Patch(':id')
  updateVideo(
    @CurrentUser('id') userId: number,
    @Body() dto: UpdateVideoDto,
    @Param('id') id: number,
  ) {
    return this.videoService.updateVideo(dto, id, userId);
  }

  @Get(':id')
  getVideoById(@CurrentUser('id') userId: number, @Param('id') id: number){
    return this.videoService.getVideoById(id, userId);
  }
}