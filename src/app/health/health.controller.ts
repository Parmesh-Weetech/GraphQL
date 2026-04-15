import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {

    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator
    ) { }

    @Get()
    async getHealth() {
        return this.health.check([
            async () => this.db.pingCheck('postgres')
        ])
    }
}
