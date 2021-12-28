import { Batches } from "./../../support/models/hr-payroll/attendance/batch/batches";
import { AddBatch } from "./../../support/models/hr-payroll/attendance/batch/addBatch";
import { username, password } from "../../support/utilities/credentials";
import { generateRandomstring } from "../../support/utilities/random";
import "cypress-file-upload";
import { AddAttendanceSheet } from "../../support/models/hr-payroll/attendance/attendance-sheet/addAttendanceSheet";
import { AttendanceSheets } from "../../support/models/hr-payroll/attendance/attendance-sheet/attendanceSheets";

const addAttendanceSheet = new AddAttendanceSheet();
const attendanceSheets = new AttendanceSheets();
const addBatch = new AddBatch();
const batches = new Batches();

let directorateId: number;
let departmentId: number;
let unitId: number;
let locationId: number;
let jobCategoryId: number;
let jobTitleId: number;
let employeeClassId: number;
let employmentTypeId: number;
let employeeGradeId: number;
let employeeId: number;
const employeeName = generateRandomstring("Echo Test");
const fileName = generateRandomstring("AttendanceSheet");
const filePath = "AttendanceSheetTemplate.xlsx";

describe("Manage Batches", () => {
    before(() => {
        cy.login({ username: username, password: password });

        PrepareCoreData();
    });

    it("Add,view employees attendance days and delete batch when valid input is provided", () => {

        cy.visit("/attendance/attendancesheets");
        attendanceSheets.addButton().click();
        addAttendanceSheet.typeSheetSelect().select("Attendance");
        addAttendanceSheet
            .fileUpload()
            .attachFile({ filePath: filePath, fileName: fileName });
        addAttendanceSheet.saveButton().click({ timeout: 10000 });

        attendanceSheets.searchComponent.type(fileName);
        attendanceSheets.attendanceSheetsTable.row(fileName).select();
        attendanceSheets.generateRecords().click({ timeout: 10000 });

        cy.visit("/attendance/batches");
        batches.addButton().click();
        const batchName = generateRandomstring("Echo-Test");
        addBatch.nameInput().type(batchName);
        addBatch.descriptionInput().type(batchName);
        addBatch.fromDatePicker().type("25/08/2020");
        addBatch.toDatePicker().type("29/08/2020");
        addBatch.saveButton().click();

        batches.searchComponent.type(batchName);
        batches.batchesTable.self().contains(batchName).should("be.visible");
        batches.batchesTable.row(batchName).select();
        batches.viewBatchdays().click();
        batches.searchComponent.type(employeeName);

        cy.contains("25/08/2020 08:00 AM").should("be.visible");
        cy.contains("25/08/2020 11:59 AM").should("be.visible");

        cy.contains("26/08/2020 08:00 AM").should("be.visible");
        cy.contains("26/08/2020 11:59 AM").should("be.visible");

        cy.contains("27/08/2020 08:00 AM").should("be.visible");
        cy.contains("27/08/2020 11:59 AM").should("be.visible");

        cy.contains("28/08/2020 08:00 AM").should("be.visible");
        cy.contains("28/08/2020 11:59 AM").should("be.visible");

        cy.contains("29/08/2020 08:00 AM").should("be.visible");
        cy.contains("29/08/2020 11:59 AM").should("be.visible");

        cy.visit("/attendance/batches");
        batches.searchComponent.type(batchName);
        batches.batchesTable.row(batchName).select();
        batches.deleteButton().click();
        batches.deleteDialog.yesButton().click();
        batches.notificationMessage.self().should("be.visible");

        cy.visit("/attendance/attendancesheets");
        batches.searchComponent.type(fileName);
        attendanceSheets.attendanceSheetsTable.row(fileName).select();
        attendanceSheets.deleteButton().click();
        attendanceSheets.deleteDialog.yesButton().click();
    });

    after(() => {
        CleanUpPreparationData();
    });

    function PrepareCoreData() {
        const directorateName = generateRandomstring("IT");
        const departmentName = generateRandomstring("Software");
        const unitName = generateRandomstring("Development");
        cy.addDirectorate(directorateName, directorateName).then(
            (directorate) => {
                directorateId = directorate.body.result.directorateId;
                cy.addDepartment(departmentName, directorateId).then(
                    (department) => {
                        departmentId = department.body.result.departmentId;
                        cy.addUnit(unitName, departmentId).then((unit) => {
                            unitId = unit.body.result.unitId;

                            const className = generateRandomstring("Software");
                            cy.addEmployeeClass(className, className).then(
                                (response) => {
                                    employeeClassId =
                                        response.body.result.employeeClassId;

                                    const locationName = generateRandomstring(
                                        "LO-A"
                                    );
                                    cy.addLocation(locationName).then(
                                        (response) => {
                                            locationId =
                                                response.body.result.locationId;

                                            const gradeName = generateRandomstring(
                                                "AA"
                                            );
                                            cy.addEmployeeGrade(
                                                gradeName,
                                                gradeName,
                                                gradeName
                                            ).then((response) => {
                                                employeeGradeId =
                                                    response.body.result
                                                        .gradeId;

                                                const jobCategoryName = generateRandomstring(
                                                    "Developer"
                                                );
                                                const jobTitleName = generateRandomstring(
                                                    "Developer"
                                                );
                                                cy.addJobCategory(
                                                    jobCategoryName
                                                ).then((jobCategory) => {
                                                    jobCategoryId =
                                                        jobCategory.body.result
                                                            .jobCategoryId;
                                                    cy.addJobTitle(
                                                        jobTitleName,
                                                        jobTitleName,
                                                        jobCategoryId
                                                    ).then((jobTitle) => {
                                                        jobTitleId =
                                                            jobTitle.body.result
                                                                .jobTitleId;

                                                        const employmentTypeName = generateRandomstring(
                                                            "FT"
                                                        );
                                                        cy.addEmploymentType(
                                                            employmentTypeName
                                                        ).then((response) => {
                                                            employmentTypeId =
                                                                response.body
                                                                    .result
                                                                    .employmentTypeId;

                                                            cy.addEmployee(
                                                                employeeName,
                                                                "EchoTest",
                                                                directorateId,
                                                                departmentId,
                                                                unitId,
                                                                locationId,
                                                                employeeClassId,
                                                                employeeGradeId,
                                                                jobTitleId,
                                                                jobCategoryId,
                                                                employmentTypeId
                                                            ).then(
                                                                (response) => {
                                                                    employeeId =
                                                                        response
                                                                            .body
                                                                            .result
                                                                            .employeeId;
                                                                }
                                                            );
                                                        });
                                                    });
                                                });
                                            });
                                        }
                                    );
                                }
                            );
                        });
                    }
                );
            }
        );
    }

    function CleanUpPreparationData() {
        if (employeeId) {
            cy.deleteEmployee(employeeId);
        }
        if (employmentTypeId) {
            cy.deleteEmploymentType(employmentTypeId);
        }
        if (locationId) {
            cy.deleteLocation(locationId);
        }
        if (employeeClassId) {
            cy.deleteEmployeeClass(employeeClassId);
        }
        if (employeeGradeId) {
            cy.deleteEmployeeGrade(employeeGradeId);
        }
        if (jobTitleId) {
            cy.deleteJobTitle(jobTitleId);
        }
        if (jobCategoryId) {
            cy.deleteJobCategory(jobCategoryId);
        }
        if (unitId) {
            cy.deleteUnit(unitId);
        }
        if (departmentId) {
            cy.deleteDepartment(departmentId);
        }
        if (directorateId) {
            cy.deleteDirectorate(directorateId);
        }
    }
});
