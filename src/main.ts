import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
  .setTitle('Bank Statement Analyser')
  .setDescription('Project aims to provides comprehensive financial overview by categorizing their bank statements into detailed expense, investment, and loan categories. This will enable users to effortlessly track their spending, manage their investments, and monitor their loan repayments, thereby promoting better financial planning and decision-making.')
  .setVersion('v1.0.0')
  // .addTag('cats')
  .build()

const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api', app, document, {
  customCssUrl: '/swagger-custom.css',
});
/* ... */

const OpenApiSpecification =
  /* … */

  app.use(
    '/api/docs',
    apiReference({
      theme: 'default',
      // cdn: 'https://cdn.jsdelivr.net/npm/@scalar/api-reference',
      spec: {
        content: document,
      },
      
    }),
    // express.static(join(__dirname, '..', 'swagger-custom.css'))
  )








  await app.listen(3000);
}
bootstrap();
