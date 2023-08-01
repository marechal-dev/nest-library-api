import { Module } from "@nestjs/common";

import { PersistenceModule } from "./infrastructure/persistence/persistence.module";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";

@Module({
	imports: [PersistenceModule, InfrastructureModule],
})
export class AppModule {}
