import { Module } from "@nestjs/common";

import { PersistenceModule } from "./persistence/persistence.module";
import { HttpModule } from "./http/http.module";
import { EmailModule } from "./email/email.module";

@Module({
	imports: [EmailModule, PersistenceModule, HttpModule],
})
export class InfrastructureModule {}
