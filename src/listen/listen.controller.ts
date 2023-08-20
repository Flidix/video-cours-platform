import { Controller } from '@nestjs/common';
import { ListenService } from './listen.service';

@Controller('listen')
export class ListenController {
  constructor(private readonly listenService: ListenService) {}
}
