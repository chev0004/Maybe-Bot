/**
 * Checks if all required environment variables are set.
 * If any are missing, it logs a fatal error and exits the process.
 * @param {string[]} requiredEnvVars An array of required environment variable names.
 */
export const validateEnvVars = (requiredEnvVars) => {
  const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    console.error("FATAL: Missing required environment variables:");
    missingVars.forEach((v) => {
      console.error(`- ${v}`);
    });
    console.error(
      "Please check your .env file and ensure all required variables are set.",
    );
    process.exit(1);
  } else {
    console.log("Environment variables validated successfully.");
  }
};
