import { AddDepartmentInput, AddDirectorateInput, AddEmployeeClassInput, AddEmployeeGradeDto, AddEmploymentTypeInput, AddJobCategoryInput, AddJobTitleInput, AddLocationInput, AddNationalityInput, AddUnitInput, DepartmentDto, DirectorateDto, EmployeeClassDto, EmployeeGradeDto, EmployeeGradesServiceProxy, EmployeeServiceProxy, EmploymentTypeDto, EmploymentTypeServiceProxy, JobCategoryDto, JobCategoryServiceProxy, JobTitleDto, JobTitleServiceProxy, LocationDto, NationalityDto, OrganizationServiceProxy, PeopleServiceProxy, UnitDto } from "../proxies/core-service-proxies";
import { generateRandomstring } from "../utilities/random";

export function createDivision(divisionName?: string) {
    if (divisionName === null) {
        divisionName = generateRandomstring("division");
    }
    const organizationServiceProxy = new OrganizationServiceProxy();
    const directorateDto = new DirectorateDto();
    const addDirectorateInput = new AddDirectorateInput();
    addDirectorateInput.directorate = directorateDto;
    directorateDto.arName = generateRandomstring("القسم");
    addDirectorateInput.directorate.name = divisionName;
    cy.log("Creating new division");
    return organizationServiceProxy.addDirectorate(addDirectorateInput)
        .then((result) => {
            expect(result.directorateId).to.be.above(0);
            return result.directorateId;
        });
}


export function createDepartment(departmentName?: string) {
    if (departmentName === null) {
        departmentName = generateRandomstring("department");
    }

    const organizationServiceProxy = new OrganizationServiceProxy();
    const departmentDto = new DepartmentDto();
    const directorateDto = new DirectorateDto();
    const addDirectorateInput = new AddDirectorateInput();
    departmentDto.directorate = directorateDto
    addDirectorateInput.directorate = directorateDto;
    directorateDto.name = generateRandomstring("Directorate is ");
    directorateDto.arName = generateRandomstring("القسم");
    const addDepartmentInput = new AddDepartmentInput();
    addDepartmentInput.department = departmentDto;
    addDepartmentInput.department.name = departmentName;
    cy.log("Creating new department");
    return organizationServiceProxy.addDepartment(addDepartmentInput)
        .then((result) => {
            expect(result.departmentId).to.be.above(0);
            return result.departmentId;
        });
}

export function createUnit(unitName?: string) {
    if (unitName === null) {
        unitName = generateRandomstring("unit");
    }
    createDepartment();
    const organizationServiceProxy = new OrganizationServiceProxy();
    const unitDto = new UnitDto();
    const addUnitInput = new AddUnitInput();
    addUnitInput.unit = unitDto;
    addUnitInput.unit.name = unitName;
    cy.log("Creating new Unit");
    return organizationServiceProxy.addUnit(addUnitInput)
        .then((result) => {
            expect(result.unitId).to.be.above(0);
            return result.unitId;
        });
}

export function createLocation(LocationName?: string) {
    if (LocationName === null) {
        LocationName = generateRandomstring("Location");
    }
    const organizationServiceProxy = new OrganizationServiceProxy();
    const locationDto = new LocationDto();
    const addLocationDtoInput = new AddLocationInput();
    addLocationDtoInput.location = locationDto;
    addLocationDtoInput.location.name = LocationName;
    cy.log("Creating new Location");
    return organizationServiceProxy.addLocation(addLocationDtoInput)
        .then((result) => {
            expect(result.locationId).to.be.above(0);
            return result.locationId;
        });
}

export function createEmployeeClass(employeeClassName?: string) {
    if (employeeClassName === null) {
        employeeClassName = generateRandomstring("EmployeeClass");
    }
    const employeeServiceProxy = new EmployeeServiceProxy();
    const employeeClassDto = new EmployeeClassDto();
    const addEmployeeClassInput = new AddEmployeeClassInput();
    addEmployeeClassInput.employeeClass = employeeClassDto;
    employeeClassDto.description = generateRandomstring("Description is ");
    addEmployeeClassInput.employeeClass.name = employeeClassName;
    cy.log("Creating new EmployeeClass");
    return employeeServiceProxy.addEmployeeClass(addEmployeeClassInput)
        .then((result) => {
            expect(result.employeeClassId).to.be.above(0);
            return result.employeeClassId;
        });
}

export function createNationality(nationalityName?: string) {
    if (nationalityName === null) {
        nationalityName = generateRandomstring("EmploymentType");
    }
    const peopleServiceProxy = new PeopleServiceProxy(Cypress.config().baseUrl as string);
    const nationalityDto = new NationalityDto();
    const addNationalityInput = new AddNationalityInput();
    addNationalityInput.nationality = nationalityDto;
    addNationalityInput.nationality.name = nationalityName;
    cy.log("Creating new Nationality");
    return peopleServiceProxy.addNationality(addNationalityInput)
        .then((result) => {
            expect(result.nationalityId).to.be.above(0);
            return result.nationalityId;
        });
}

export function createEmployeeGrade(EmployeeGradeName: string) {
    if (EmployeeGradeName === null) {
        EmployeeGradeName = generateRandomstring("EmployeeGrade");
    }
    const employeeGradesServiceProxy = new EmployeeGradesServiceProxy();
    const employeeGradeDto = new EmployeeGradeDto();
    const addEmployeeGradeDto = new AddEmployeeGradeDto();
    addEmployeeGradeDto.employeeGradeDto = employeeGradeDto;
    employeeGradeDto.description = generateRandomstring("Description is ");
    employeeGradeDto.category = generateRandomstring("category is ");
    addEmployeeGradeDto.employeeGradeDto.name = EmployeeGradeName;
    cy.log("Creating new Employee Grade");
    return employeeGradesServiceProxy.addEmployeeGrade(addEmployeeGradeDto)
        .then((result) => {
            expect(result.gradeId).to.be.above(0);
            return result.gradeId;
        });
}

export function createEmploymentType(employmentTypeName?: string) {
    if (employmentTypeName === null) {
        employmentTypeName = generateRandomstring("EmploymentType");
    }
    const employmentTypeServiceProxy = new EmploymentTypeServiceProxy();
    const employmentTypeDto = new EmploymentTypeDto();
    const addEmploymentTypeInput = new AddEmploymentTypeInput();
    addEmploymentTypeInput.employmentType = employmentTypeDto;
    addEmploymentTypeInput.employmentType.name = employmentTypeName;
    cy.log("Creating new Employment Type");
    return employmentTypeServiceProxy.addEmploymentType(addEmploymentTypeInput)
        .then((result) => {
            expect(result.employmentTypeId).to.be.above(0);
            return result.employmentTypeId;
        });
}

export function createJobCategory(jobCategoryName?: string) {
    if (jobCategoryName === null) {
        jobCategoryName = generateRandomstring("JobCategory");
    }
    const jobCategoryServiceProxy = new JobCategoryServiceProxy();
    const jobCategoryDto = new JobCategoryDto();
    const addJobCategoryInput = new AddJobCategoryInput();
    addJobCategoryInput.jobCategory = jobCategoryDto;
    addJobCategoryInput.jobCategory.name = jobCategoryName;
    cy.log("Creating new Job Category");
    return jobCategoryServiceProxy.addJobCategory(addJobCategoryInput)
        .then((result) => {
            expect(result.jobCategoryId).to.be.above(0);
            return result.jobCategoryId;
        });
}

export function createJobTitles(jobTitlesName?: string) {
    if (jobTitlesName === null) {
        jobTitlesName = generateRandomstring("JobTitles");
    }
    const jobTitleServiceProxy = new JobTitleServiceProxy();
    const jobTitleDto = new JobTitleDto();
    jobTitleDto.jobCategory = null as unknown as JobCategoryDto;
    const addJobTitleInput = new AddJobTitleInput();
    addJobTitleInput.jobTitle = jobTitleDto;
    addJobTitleInput.jobTitle.name = jobTitlesName;
    createJobCategory().then((jobCategoryId) => addJobTitleInput.jobTitle.jobCategoryId = jobCategoryId);
    addJobTitleInput.jobTitle.jobSpecification = "sp";
    expect(addJobTitleInput.jobTitle.jobCategoryId).to.be.above(0);
    cy.log("Creating new Title");
    return jobTitleServiceProxy.addJobTitle(addJobTitleInput)
        .then((result) => {
            expect(result.jobTitleId).to.be.above(0);
            return result.jobTitleId;
        });
}



