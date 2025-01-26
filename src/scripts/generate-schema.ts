import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { createGenerator } from 'ts-json-schema-generator';
import type {
  Config,
  SchemaGenerator as JsonSchemaGenerator,
} from 'ts-json-schema-generator';

import { Logger } from '../shared/utils/logger/logger';

/**
 * Class for generating JSON schemas from TypeScript types.
 */
class SchemaGenerator {
  private filePattern: string;
  private outputDirectory: string;
  private tsconfigFile: string;
  private settings: Config;
  private generator?: JsonSchemaGenerator;

  /**
   * Initialize a new instance of the SchemaGenerator class.
   * @param _filePattern - A glob pattern for matching TypeScript files.
   * @param _outputDirectory - The directory where the generated schemas will be saved.
   * @param _tsconfigFile - The path to the TypeScript config file (tsconfig.json),
   * @param _additionalSettings - Optional additional configuration for the schema generator.
   */
  constructor(
    _filePattern: string,
    _outputDirectory: string,
    _tsconfigFile: string,
    _additionalSettings: Partial<Config> = {},
  ) {
    Logger.boot('DEBUG');
    this.filePattern = _filePattern;
    this.outputDirectory = _outputDirectory;
    this.tsconfigFile = _tsconfigFile;
    this.settings = {
      path: this.filePattern,
      tsconfig: this.tsconfigFile,
      expose: 'all',
      jsDoc: 'extended',
      topRef: true,
      type: '*',
      ..._additionalSettings,
    };

    this.clearAndEnsureOutputDirectory();
  }

  /**
   * Clears the output directory if it exists; otherwise, creates it.
   */
  private clearAndEnsureOutputDirectory(): void {
    if (existsSync(this.outputDirectory)) {
      // Use rmSync to delete the directory and recreate it
      rmSync(this.outputDirectory, { recursive: true, force: true });
    }
    mkdirSync(this.outputDirectory, { recursive: true });
  }

  /**
   * Generates JSON schemas for all TypeScript types matching the specified pattern.
   */
  public generateSchema(): void {
    if (!this.generator) {
      this.generator = createGenerator(this.settings);
    }

    const schema = this.generator.createSchema();
    const { definitions } = schema;

    if (!definitions) {
      const errorMessage = 'No definitions found for the generated schema.';
      Logger.error(errorMessage, SchemaGenerator.name, {});
      throw new Error(errorMessage);
    }

    // Use a single loop to write all schemas
    const schemaEntries = Object.entries(definitions);
    if (schemaEntries.length === 0) {
      Logger.warning('No schemas to write.', SchemaGenerator.name, {});
      return;
    }

    schemaEntries.forEach(([name, schemaDefinition]) => {
      const schemaName = `${name}.schema.json`;
      const outputPath = join(this.outputDirectory, schemaName);
      writeFileSync(
        outputPath,
        JSON.stringify(schemaDefinition, null, 2),
        'utf8',
      );
      Logger.debug(
        `Schema for "${name}" written to "${outputPath}"`,
        SchemaGenerator.name,
        {},
      );
    });

    Logger.info(
      `Generated ${schemaEntries.length} schema files.`,
      SchemaGenerator.name,
      {},
    );
  }
}

// Run the generator
new SchemaGenerator(
  resolve(__dirname, '../../src/**/*.dto.ts'),
  resolve(__dirname, '../Infrastructure/swagger/schemas'),
  resolve(__dirname, '../../tsconfig.json'),
  {},
).generateSchema();
