class HealthCheckDto {
  database:
    | 'disconnected'
    | 'connected'
    | 'connecting'
    | 'disconnecting'
    | 'uninitialized';
  timestamp: Date;
  upTime: number;

  constructor(
    database:
      | 'disconnected'
      | 'connected'
      | 'connecting'
      | 'disconnecting'
      | 'uninitialized',
    timestamp: Date,
    upTime: number,
  ) {
    this.database = database;
    this.timestamp = timestamp;
    this.upTime = upTime;
  }
}

export { HealthCheckDto };
