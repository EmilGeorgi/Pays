import React from "react";
import {
  TextInput,
  Edit,
  SimpleForm,
  NumberInput,
  DateInput
} from "react-admin";

const agreementTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const AgreementEdit = (props) => (
  <Edit title={<agreementTitle />} {...props}>
    <SimpleForm>
      <NumberInput source="MobilePaySubscriptionAgreement.amount" label="beløb" ></NumberInput>
      <TextInput source="MobilePaySubscriptionAgreement.plan" label="plan"></TextInput>
      <DateInput source="MobilePaySubscriptionAgreement.nextPaymentDate" label="næste betaling dato" ></DateInput>
      <NumberInput source="MobilePaySubscriptionAgreement.frequency" label="frekvens" ></NumberInput>
    </SimpleForm>
  </Edit>
);