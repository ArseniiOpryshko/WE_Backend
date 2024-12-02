import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkerDto } from './dtos/CreateWorker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from 'src/typeorm/entities/Worker';
import { Repository } from 'typeorm';
import { UpdateWorkerDto } from './dtos/UpdateWorker.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker) private workerRepository: Repository<Worker>,
  ) {}

  findAll() {
    return this.workerRepository.find();
  }

  fetchWorkerById(id: number) {
    return this.workerRepository.findBy({ id });
  }

  createWorker(createWorkerDto: CreateWorkerDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    this.handleFileValidation(file);

    const newWorker = this.workerRepository.create({
      ...createWorkerDto,
      logo: file.filename,
    });

    return this.workerRepository.save(newWorker);
  }

  async updateWorker(
    id: number,
    updateWorkerDto: UpdateWorkerDto,
    file?: Express.Multer.File,
  ) {
    const worker = await this.workerRepository.findOne({ where: { id } });
    if (!worker) {
      throw new NotFoundException(`Worker with id ${id} not found`);
    }
    let updatedLogo = worker.logo;

    if (file) {
      this.handleFileValidation(file);

      if (worker.logo) {
        const filePath = path.join(
          __dirname,
          '..',
          '..',
          'uploads',
          worker.logo,
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      updatedLogo = file.filename;
    }

    await this.workerRepository.update(
      { id },
      { ...updateWorkerDto, logo: updatedLogo },
    );

    return await this.workerRepository.findOne({ where: { id } });
  }

  async deleteWorker(id: number) {
    const worker = await this.workerRepository.findOne({ where: { id } });

    if (!worker) {
      throw new NotFoundException(`Worker with id ${id} not found`);
    }

    if (worker.logo) {
      const filePath = path.join(__dirname, '..', '..', 'uploads', worker.logo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await this.workerRepository.delete({ id });

    return { message: `Worker with id ${id} has been deleted` };
  }

  private handleFileValidation(file: Express.Multer.File): string {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('File is too large!');
    }

    return file.filename;
  }
}
