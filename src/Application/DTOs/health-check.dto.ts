type HealthCheckDto = {
  database:
    | 'disconnected'
    | 'connected'
    | 'connecting'
    | 'disconnecting'
    | 'uninitialized';
  timestamp: Date;
  uptime: number;
};

export { HealthCheckDto };
