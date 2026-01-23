// In this function fetch mri cube token store it locally and only fetch it when required/expired
import { logger } from "../../index.js";
import axios from "axios";

async function fetchToken() {
  try {
    // Use the full URL as in your working curl
    const url = `https://2760-portals.qubeglobalcloud.com/RestAPI/v1/authorisation/token?id=${process.env.CLIENT_ID}&sec=${process.env.CLIENT_SECRET}&scope=qpm%3Arightnow`;

    const response = await axios.get(url);

    const data = response.data;

    console.log("Token response:", data);

    return {
      tokenValue: data.tokenValue,
      expiresInMins: data.expiresInMins,
    };
  } catch (error) {
    console.error(
      "Error fetching token:",
      error.response?.data || error.message
    );
    return null;
  }
}

class MRICubeTokenManager {
  constructor() {
    this.accessToken = null;
    this.expiresAt = null;
    this.refreshPromise = null; // prevents parallel refresh
  }

  /**
   * Returns a valid access token
   */
  async getToken() {
    // Reuse token if valid
    if (this.accessToken && !this.isTokenExpired()) {
      return this.accessToken;
    }

    // Wait if a refresh is already in progress
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    // Refresh token
    this.refreshPromise = this.refreshToken();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Checks if token is expired (with 2-minute buffer)
   */
  isTokenExpired() {
    if (!this.expiresAt) return true;

    const bufferMs = 2 * 60 * 1000; // 2 minutes
    return Date.now() >= this.expiresAt - bufferMs;
  }

  /**
   * Fetches new token from MRI Cube
   */
  async refreshToken() {
    try {
      logger.info("Refreshing MRI Cube access token");

      // Construct the full URL (to avoid double-encoding issues)
      const url = `https://2760-portals.qubeglobalcloud.com/RestAPI/v1/authorisation/token?id=${process.env.MRI_CUBE_CLIENT_ID}&sec=${process.env.MRI_CUBE_CLIENT_SECRET}&scope=qpm%3Arightnow`;

      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = response.data;

      if (!data.tokenValue || !data.expiresInMins) {
        throw new Error("Invalid token response from MRI Cube API");
      }

      this.accessToken = data.tokenValue;
      // Calculate expiry in ms
      this.expiresAt = Date.now() + data.expiresInMins * 60 * 1000;

      console.info(
        `MRI Cube token refreshed. Expires in ${data.expiresInMins} minutes`
      );

      return this.accessToken;
    } catch (error) {
      console.error(
        "Failed to refresh MRI Cube token",
        error.response?.data || error.message
      );
      this.accessToken = null;
      this.expiresAt = null;
      throw error;
    }
  }
}

const mriCubeTokenManager = new MRICubeTokenManager();

export { mriCubeTokenManager, fetchToken };
