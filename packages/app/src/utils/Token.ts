import axios, { AxiosInstance } from "axios";
import SecureStore from "expo-secure-store";

class Token {
  private static instance: Token | null = null;
  private accessToken: string;
  private refreshToken: string;
  private axiosInstance: AxiosInstance;

  private constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.axiosInstance = axios.create();
  }

  public static async getInstance(
    accessToken?: string,
    refreshToken?: string
  ): Promise<Token> {
    if (!Token.instance) {
      const accessTokenFromStorage =
        (await SecureStore.getItemAsync("accessToken")) || "";
      const refreshTokenFromStorage =
        (await SecureStore.getItemAsync("refreshToken")) || "";
      Token.instance = new Token(
        accessTokenFromStorage,
        refreshTokenFromStorage
      );
    }

    if (accessToken && refreshToken) {
      Token.instance.accessToken = accessToken;
      Token.instance.refreshToken = refreshToken;
      await Token.instance.setAccessToken(accessToken);
      await Token.instance.setRefreshToken(refreshToken);
    }

    return Token.instance;
  }

  public async init(): Promise<void> {
    this.accessToken = (await SecureStore.getItemAsync("accessToken")) || "";
    this.refreshToken = (await SecureStore.getItemAsync("refreshToken")) || "";
    // Configure axios instance as needed
  }

  public async setAccessToken(accessToken: string): Promise<void> {
    this.accessToken = accessToken;
    await SecureStore.setItemAsync("accessToken", accessToken);
  }

  public async setRefreshToken(refreshToken: string): Promise<void> {
    this.refreshToken = refreshToken;
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  }

  public async deleteAll(): Promise<void> {
    await this.setAccessToken("");
    await this.setRefreshToken("");
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public async getSession(): Promise<string | null> {
    try {
      const response = await this.axiosInstance.get("/auth/app/token/login", {
        params: {
          accessToken: this.accessToken,
          deviceToken: "YourDeviceToken", // Replace with actual device token retrieval logic
        },
      });

      if (response.status === 200) {
        // Assuming the cookie with session is automatically handled by your application's environment
        // You may need to handle session cookie explicitly depending on your setup
        return "SessionCookieValue"; // Replace with actual logic to extract session cookie
      }

      if (
        response.status === 401 &&
        response.data.message === "Expired token"
      ) {
        const tokenRefreshed = await this.updateAccessTokenUsingRefreshToken();
        if (tokenRefreshed) {
          return await this.getSession();
        }
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async updateAccessTokenUsingRefreshToken(): Promise<boolean> {
    try {
      const response = await this.axiosInstance.get("/auth/app/token/refresh", {
        params: {
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
        },
      });

      if (response.status === 200) {
        await this.setAccessToken(response.data.accessToken);
        await this.setRefreshToken(response.data.refreshToken);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default Token;
