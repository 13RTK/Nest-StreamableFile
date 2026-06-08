import { Controller, Get, Param, Res, Header } from '@nestjs/common';
import { VideoService } from './video.service';

import { Response } from 'express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('stream/:id')
  @Header('Accept-Ranges', 'bytes') //custom header for byte range
  @Header('Content-Type', 'video/mp4')
  async streamVideo(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const stream = await this.videoService.streamVideo(id);
    res.set({
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
    });
    return stream;
  }
}
