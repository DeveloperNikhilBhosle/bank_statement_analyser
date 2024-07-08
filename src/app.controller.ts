import { BadRequestException, Body, Controller, Get, HttpCode, InternalServerErrorException, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { apiResponse } from './utils/api_response';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { UploadDocDto } from './models/fileupload';
import { FileToJsonServie } from './utils/file_to_json';
import { result } from 'cypress/types/lodash';
import { FileToJsonService } from './utils/statement_reader';



@Controller()
@ApiTags('Api Service')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('bank-statement-analyser')
  // @HttpCode(200)
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Return all transactions.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'UnAuthorised.' })
  @ApiResponse({ status: 500, description: 'Interval Server Error.' })
  @ApiResponse({ status: 400, description: 'Invalid Inputs.' })
  @UseInterceptors(FileInterceptor('csvfile'))
  // @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async validateRequest(@Query('version') version: number,@UploadedFile() file: Express.Multer.File, @Body() obj : UploadDocDto){
  {
    if(version == 1){
       console.log(file,'file');
      const results = await FileToJsonServie.parseCsv(file);
      // console.log(results,'result');

      const stmt = await FileToJsonService.statementAnalyser(results);
      return apiResponse.ReturnResponse(200, "Bank Statement Analyser API Success", stmt); 
    }

    return apiResponse.ReturnResponse(400, "Invalid Version Number");
    // return new BadRequestException({remark : "Invalid API Versiocdsfknlkerafmlkrsamnforenhnsss"})
  }
  }




  // @Post('file-to-csv')
  // @UseInterceptors(FileInterceptor('csvfile'))
  // @ApiConsumes('multipart/form-data')
  // async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() obj : UploadDocDto) {

  //   console.log(file,'file');

  //   const results = FileToJsonServie.parseCsv(file);

    

  // }

}
