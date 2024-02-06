import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Lade Umgebungsvariablen aus der .env-Datei für die lokale Entwicklung
dotenv.config();

/**
 * Versucht, ein Docker Secret zu lesen. Gibt den Wert des Secrets oder den Wert der Umgebungsvariablen zurück.
 * @param secretName Der Name des Docker Secrets.
 * @returns Den Wert des Secrets als String oder den Wert der Umgebungsvariablen.
 */
function getConfigurationValue(secretName: string): string {
  const secretPath = path.join('/run/secrets/', secretName);
  try {
    return fs.readFileSync(secretPath, 'utf8').trim();
  } catch (err) {
    // Wenn das Secret nicht als Datei vorliegt, greife auf die Umgebungsvariable zurück
    const envValue = process.env[secretName];
    if (envValue === undefined) {
      throw new Error(`Neither secret nor environment variable set for '${secretName}'`);
    }
    return envValue;
  }
}

export default () => ({
  mongoDbUri: getConfigurationValue('MONGO_DB_URI'),
  jwtSecret: getConfigurationValue('JWT_SECRET'),
  paymentsHost: getConfigurationValue('PAYMENTS_HOST'),
  paymentsPort: getConfigurationValue('PAYMENTS_PORT'),
  notificationsHost: getConfigurationValue('NOTIFICATIONS_HOST'),
  notificationsPort: getConfigurationValue('NOTIFICATIONS_PORT'),
  // Füge hier weitere Konfigurationswerte hinzu, die deine Anwendung benötigt.
});
