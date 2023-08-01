import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { env } from "./configs/env";
import { setupSwagger } from "./configs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	app.setGlobalPrefix("api");

	if (env.NODE_ENV === "development") {
		setupSwagger(app);
	}

	await app.listen(env.PORT, "0.0.0.0");
}

bootstrap();
