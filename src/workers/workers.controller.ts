import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateWorkerDto } from './dtos/CreateWorker.dto';
import { UpdateWorkerDto } from './dtos/UpdateWorker.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.workersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getWorkerById(@Param('id', ParseIntPipe) id: number) {
    const workers = await this.workersService.fetchWorkerById(id);
    return workers;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  createWorker(
    @Body() createWorkerDto: CreateWorkerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.workersService.createWorker(createWorkerDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  async updateWorkerById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkerDto: UpdateWorkerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.workersService.updateWorker(id, updateWorkerDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteFilmById(@Param('id', ParseIntPipe) id: number) {
    return await this.workersService.deleteWorker(id);
  }
}
