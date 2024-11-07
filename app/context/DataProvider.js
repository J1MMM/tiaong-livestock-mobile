import React, { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    surname: "",
    firstname: "",
    middlename: "",
    extensionName: "",
    sex: "",
    houseNo: "",
    street: "",
    barangay: "",

    contactNo: "",
    birthDate: null,
    birthPlace: "",
    religion: "",
    specifyReligion: "",
    civilStatus: "",
    spouseName: "",
    motherMaidenName: "",
    householdHead: "",
    nameOfHouseholdHead: "",
    numberOfLivingHead: "",
    noMale: "",
    noFemale: "",

    education: "",
    PWD: "",
    memberIndigenousGroup: "",
    specifyIndigenousGroup: "",
    withGovernmentID: "",
    specifyGovernmentID: "",
    memberAssociationOrCooperative: "",
    specifyAssociationOrCooperative: "",
    personToNotifyInCaseEmergency: "",
    contactPersonToNotifyInCaseEmergency: "",

    livelihood: "",
    livestockChecked: false,
    livestockSpecify: "",
    poultryChecked: false,
    poultrySpecify: "",

    landPreparationChecked: false,
    harvestingChecked: false,
    kindOfWorkOther: false,
    kindOfWorkSpecify: "",

    grossAnnualIncome: "",
    specifyGrossAnnualIncome: "",
  });

  return (
    <DataContext.Provider value={{ userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
