export class EndPoints {

    public static readonly BASE_URL: string = "http://localhost:9002";
    static PRINT_EMPLOYEE_REPORT(userId:string):string{
        // return this.BASE_URL+"/reports/employeeReport/"+userId;
        return this.BASE_URL+"/reports/employeeReport/"+userId;
    }
    static DOWNLOAD_EMPLOYEE_REPORT_TO_EXCEL(userId:string):string{
        // return this.BASE_URL+"/reports/employeeReport/"+userId;
        return this.BASE_URL+"/reports/employeeReportExport/"+userId;
    }
}