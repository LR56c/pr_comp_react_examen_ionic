export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<boolean>;
  abstract register(email: string, password: string): Promise<boolean>;
  abstract logout(): Promise<void>;
}
