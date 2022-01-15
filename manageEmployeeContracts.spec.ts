import { createDepartment, createDivision, createEmployeeGrade, createEmploymentType, createJobCategory, createJobTitles, creatEmployee, createUnit } from "../../support/commands/employeeSetupConfiguration";
import { AddEmployeeContract } from "../../support/models/hr-payroll/core/employee-contract/addEmployeeContract";
import { Contracts } from "../../support/models/hr-payroll/core/employee-contract/contracts";
import { EditEmployeeContract } from "../../support/models/hr-payroll/core/employee-contract/editEmployeeContract";
import { EditEmployee } from "../../support/models/hr-payroll/core/employee/editEmployee";
import { Employees } from "../../support/models/hr-payroll/core/employee/employees";
import { SearchComponent } from "../../support/models/shared-components/searchComponent";
import { DeleteEmployeeInput, DeleteNationalityInput, EmployeeServiceProxy, GetEmployeeInput, PeopleServiceProxy } from "../../support/proxies/core-service-proxies";
import { password, username } from "../../support/utilities/credentials";
import { generateRandomstring } from "../../support/utilities/random";

const searchComponent = new SearchComponent();
const employees = new Employees();
const editEmployee = new EditEmployee();
const contracts = new Contracts();
const addEmployeeContract = new AddEmployeeContract();
const editEmployeeContract = new EditEmployeeContract();

let employeeId: number | undefined;


describe("Manage Employee contracts", () => {
    before(() => {

        cy.login({ username: username, password: password });
    });
    it("Create,Edit and delete employee contract", () => {


        const employeeName = generateRandomstring("employee");
        cy.waitUntil(() => creatEmployee(employeeName).then(result => {
            employeeId = result.employeeId;
            return result.employeeId > 0
        }
        ));

        cy.visit("/core/employees");
        cy.viewport(1366, 768);
        searchComponent.type(employeeName);
        employees.employeesTable.row(employeeName).select();
        employees.editButton().click();
        editEmployee.listMenu().contains("Contracts").should('be.visible').click();

        contracts.addButton().click();

        const jobCategoryName = generateRandomstring("JobCategory");
        createJobCategory(jobCategoryName);
        addEmployeeContract.jobCategorySelect().select(jobCategoryName);

        const jobTitlesName = generateRandomstring("JobTitles");
        createJobTitles();
        addEmployeeContract.jobTitleSelect().select(jobTitlesName);

        addEmployeeContract.startDateInput().type("01/01/2021");
        addEmployeeContract.endtDateInput().type("31/12/2022");

        const employmentTypeName = generateRandomstring("EmploymentType");
        createEmploymentType();
        addEmployeeContract.employmentTypeSelect().select(employmentTypeName);

        const EmployeeGradeName = generateRandomstring("EmployeeGrade");
        createEmployeeGrade()
        addEmployeeContract.gradeSelect().select(EmployeeGradeName);

        const divisionName = generateRandomstring("division");
        createDivision();
        addEmployeeContract.directorateSelect().select(divisionName);

        const departmentName = generateRandomstring("department");
        createDepartment();
        addEmployeeContract.departmentSelect().select(departmentName);

        const unitName = generateRandomstring("unit");
        createUnit();
        addEmployeeContract.unitSelect().select(unitName);

        addEmployeeContract.isActiveSlideToggle().click();
        addEmployeeContract.saveButton().click();

        contracts.contractsTable.row("JobTitles").select();
        contracts.editButton().click();
        editEmployeeContract
            .startDateInput()
            .clear()
            .type("01/02/2021")
        editEmployeeContract.saveButton().click();

        contracts.contractsTable.row("JobTitles").select();
        contracts.deleteButton().click();
        contracts.deleteDialog.yesButton().click();
        contracts.contractsTable
            .self()
            .contains("JobTitles")

            .should("not.be.visible", { timesout: 1000 });

    });
    //     after(() => {
    //         if (employeeId) {
    //             deleteEmployee(employeeId);
    //         }
    //     });
});

const deleteEmployee = (employeeId: number) => {
    const employeeServiceProxy = new EmployeeServiceProxy(Cypress.config().baseUrl as string);
    const input = new GetEmployeeInput();
    input.employeeId = employeeId;
    employeeServiceProxy.getEmployee(input).then(async result => {
        const employee = result.employee;
        if (result) {
            const deleteEmployeeInput = new DeleteEmployeeInput();
            deleteEmployeeInput.employeeId = employeeId;
            await employeeServiceProxy.deleteEmployee(deleteEmployeeInput);
            await deleteNationality(employee.nationalityId);
        }
    });
}

async function deleteNationality(nationalityId: number) {
    const peopleServiceProxy = new PeopleServiceProxy(Cypress.config().baseUrl as string);
    const input = new DeleteNationalityInput();
    input.nationalityId = nationalityId;
    await peopleServiceProxy.deleteNationality(input);
}