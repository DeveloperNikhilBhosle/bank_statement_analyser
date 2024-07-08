import { ApiProperty } from "@nestjs/swagger";

export class UploadDocDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    csvfile: any;
  
  }