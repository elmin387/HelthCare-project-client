import axios, { AxiosResponse } from "axios";
import { customAxios } from "../axios/axios";
import { API_PATHS } from "../utils/constants";
import { PatientReportItem } from "../interfaces/ReportInterface";

// export const createReport = (reportData: PatientReportItem) => {
//     console.log(reportData);
//     return axios.post<PatientReportItem>('https://localhost:7048/api/Report', reportData);
//   };
export const createReport = async (reportData: PatientReportItem) => {
    try {
      const response = await axios.post<PatientReportItem>('https://localhost:7048/api/Report', reportData);
      return response.data;
    } catch (error) {
      console.error('Error creating report:', error);
      throw error;
    }
  };

//   export const getReportByAcceptance = (acceptanceId: number) => {
//     return axios.get<PatientReportItem>(`${API_PATHS.GETREPORT}/${acceptanceId}`);
//   };

export const getReportByAcceptance = async (acceptanceId: number): Promise<PatientReportItem | null> => {
  const response = await axios.get(`https://localhost:7048/api/Report/${acceptanceId}`);
  console.log(response.data);
  return response.data.item;
};