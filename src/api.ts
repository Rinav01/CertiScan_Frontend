import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Accept": "application/json",
  },
});

// API Response Types
export interface HealthCheckResponse {
  status: string;
  message?: string;
  model_status?: string;
}

export interface PredictionResponse {
  uuid: string;
  message?: string;
  mask_url?: string;
  confidence?: number;
  [key: string]: any;
}

export interface ApiError {
  status: number;
  message: string;
  details?: string;
}

// GET / - Home
export const getHome = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// GET /health - Health Check
export const checkHealth = async (): Promise<HealthCheckResponse> => {
  try {
    const response = await apiClient.get<HealthCheckResponse>("/health");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// POST /predict - Deepfake Detection
export const predictDeepfake = async (
  file: File
): Promise<PredictionResponse> => {
  try {
    // Validate file
    if (!file) {
      throw {
        status: 400,
        message: "No file provided",
      };
    }

    // Check file size (you can adjust MAX_SIZE based on backend config)
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB default
    if (file.size > MAX_SIZE) {
      throw {
        status: 413,
        message: "File too large",
        details: `Max file size: ${MAX_SIZE / 1024 / 1024}MB`,
      };
    }

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      throw {
        status: 400,
        message: "Non-image file detected",
        details: "Please upload a valid image file (PNG, JPG, etc.)",
      };
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<PredictionResponse>(
      "/predict",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get prediction mask
export const getPredictionMask = (uuid: string): string => {
  return `${API_BASE_URL}/outputs/${uuid}.png`;
};

// Error Handler
const handleApiError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      return {
        status: error.response.status,
        message:
          error.response.data?.message || `Error: ${error.response.status}`,
        details: error.response.data?.detail || undefined,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        status: 0,
        message: "No response from server",
        details: `Unable to connect to ${API_BASE_URL}`,
      };
    }
  } else if (error.status && error.message) {
    // Custom error object
    return error as ApiError;
  }

  return {
    status: 500,
    message: "An unexpected error occurred",
    details: error?.message || String(error),
  };
};

// Utility: Upload image (backward compatible)
export const uploadImage = async (file: File) => {
  return predictDeepfake(file);
};