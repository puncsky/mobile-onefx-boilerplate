import { ENDPOINT } from "../config";

export const headers: { [key: string]: string } = {
  "x-app-id": "mobile-guiguio"
};

export const getEndpoint = (path: string) => `${ENDPOINT}${path}`;
