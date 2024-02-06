// Erweiterung, um eine Methode den vorhandenen ConfigService

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class CustomConfigService extends ConfigService {
  private readonly logger = new Logger(CustomConfigService.name);
  getSecretOrEnvValue(key: string): string {
    const secretPath = `/run/secrets/${key}`;
    try {
      const value = fs.readFileSync(secretPath, 'utf8').trim();
      this.logger.log(`Loaded '${key}' from Docker secret`);
      return value;
    } catch {
      const value = this.get<string>(key);
      if (value) {
        this.logger.log(`Loaded '${key}' from environment variable`);
      } else {
        this.logger.warn(
          `'${key}' not found as Docker secret or environment variable`,
        );
      }
    }
  }
}
