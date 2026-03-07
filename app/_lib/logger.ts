// Simple structured logger for production
export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

class Logger {
  private isDev = process.env.NODE_ENV === "development";

  private log(level: LogLevel, message: string, metadata?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    };

    // Skip debug logs in production
    if (level === "debug" && !this.isDev) return;

    const output = JSON.stringify(entry);

    switch (level) {
      case "debug":
        console.debug(output);
        break;
      case "info":
        console.info(output);
        break;
      case "warn":
        console.warn(output);
        break;
      case "error":
        console.error(output);
        break;
    }
  }

  debug(message: string, meta?: Record<string, unknown>) {
    this.log("debug", message, meta);
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.log("warn", message, meta);
  }

  error(message: string, error?: Error, meta?: Record<string, unknown>) {
    this.log("error", message, {
      ...meta,
      ...(error && {
        errorName: error.name,
        errorMessage: error.message,
      }),
    });
  }
}

// Singleton instance
export const logger = new Logger();
