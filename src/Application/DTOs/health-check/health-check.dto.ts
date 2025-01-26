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
    if (!(timestamp instanceof Date) || isNaN(timestamp.getDate())) {
      throw new Error('Invalid timestamp');
    }
    if (upTime < 0) {
      throw new Error('Uptime cannot be negative');
    }
    this.database = database;
    this.timestamp = timestamp;
    this.upTime = upTime;
  }
}

export { HealthCheckDto };
