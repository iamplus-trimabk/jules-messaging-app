import { OpenAPI } from './core/OpenAPI';
import { storageService } from './storage.service';

const TOKEN_KEY = 'simflo_token';

export class BaseService {
  public static setToken(token: string): void {
    storageService.setItem(TOKEN_KEY, token);
    OpenAPI.HEADERS = {
      ...OpenAPI.HEADERS,
      Authorization: `Bearer ${token}`,
    };
  }

  public static getToken(): string | null {
    return storageService.getItem(TOKEN_KEY);
  }

  public static clearToken(): void {
    storageService.removeItem(TOKEN_KEY);
    OpenAPI.HEADERS = {
      ...OpenAPI.HEADERS,
      Authorization: undefined,
    };
  }

  public static initialize(): void {
    const token = this.getToken();
    if (token) {
      this.setToken(token);
    }

    // Set the base URL for the API
    OpenAPI.BASE = 'http://localhost:3000';
  }
}

BaseService.initialize();
