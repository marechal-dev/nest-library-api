import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { patchNestJsSwagger } from "nestjs-zod";

export function setupSwagger(app: NestFastifyApplication) {
	patchNestJsSwagger();

	const config = new DocumentBuilder()
		.setTitle("Library API")
		.setDescription("Simple Library Management API")
		.setContact(
			"Pietro Piva Vieira",
			"https://github.com/marechal-dev",
			"pietro.developer@gmail.com",
		)
		.setVersion("1.0")
		.addTag("books")
		.addTag("authors")
		.addTag("auth")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("api/docs", app, document);
}
