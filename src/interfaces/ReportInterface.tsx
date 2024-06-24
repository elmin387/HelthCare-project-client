export type ReportModalProps = {
    show:boolean;
    onClose:()=>void;
    acceptanceId:number;
    onSave:()=>void;
    report: PatientReportItem | null;
  }
  export type PatientReportItem = {
    reportId?:number;
    acceptanceId:number;
    reportDescription:string;
    dateTimeOfReport:string;
  }