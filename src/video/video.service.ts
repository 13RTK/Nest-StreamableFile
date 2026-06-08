import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';

@Injectable()
export class VideoService {
  async streamVideo(id: string) {
    const videoPath = `assets/${id}.mp4`;
    const file = createReadStream(videoPath);
    const { size } = await stat(videoPath);

    return new StreamableFile(file, {
      type: 'video/mp4',
      disposition: 'inline',
      length: size,
    });
  }
}
