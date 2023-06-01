import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApplicationModule } from "./application/application.module";

@Module({
	imports: [ApplicationModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
