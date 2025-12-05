import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as mime from 'mime-types';

@Injectable()
export class FilesService {
  private readonly uploadPath = path.join(process.cwd(), 'uploads');

  constructor() {
    this.ensureUploadsDir();
  }

  private async ensureUploadsDir() {
    try {
      await fs.mkdir(this.uploadPath, { recursive: true });
    } catch (error) {
      console.error('Error creating uploads directory:', error);
    }
  }

  private getFileCategory(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  }

  async handleFileUpload(files: Express.Multer.File[]) {
    const processedFiles = [];

    for (const file of files) {
      const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');
      const extension = mime.extension(file.mimetype);
      const fileName = `${hash}.${extension}`;
      const filePath = path.join(this.uploadPath, fileName);

      try {
        await fs.access(filePath);
        // File already exists, no need to save it again
      } catch {
        // File does not exist, save it
        await fs.writeFile(filePath, file.buffer);
      }

      processedFiles.push({
        hash,
        originalName: file.originalname,
        mimeType: file.mimetype,
        extension,
        category: this.getFileCategory(file.mimetype),
        size: file.size,
      });
    }
    return processedFiles;
  }
}
