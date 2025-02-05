import { config } from 'dotenv';
import { z } from 'zod';

class Config {
  private static instance: Config;
  private static schema = z.object({
    PORT: z.coerce
      .number()
      .positive({ message: 'PORT must be a positive number' })
      .min(1000, { message: 'PORT must be greater than 1000' })
      .max(9999, { message: 'PORT must be less than 9999' })
      .default(3003),
    NODE_ENV: z
      .union([
        z.literal('development'),
        z.literal('test'),
        z.literal('production'),
      ])
      .default('development'),
    MONGO_HOST: z.string(),
    MONGO_USERNAME: z.string(),
    MONGO_PASSWORD: z.string(),
    MONGO_DATABASE: z.string(),
  });
  public env: z.infer<typeof Config.schema>;

  private constructor() {
    config();
    this.env = Config.schema.parse(process.env);
  }

  public static GetInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export { Config };
