import React from "react";
import { useMediaQuery, Button } from "@material-ui/core";
import {
  List,
  Datagrid,
  SimpleList,
  TextField,
  ReferenceField,
  ShowButton,
  DateField,
  Filter,
  TextInput,
  FilterListItem,
  usePermissions
} from "react-admin";

const HasPayment = () => (
  <FilterListItem
    label="Betalinger"
    value={{ has_payment: true }}
  />
);

// const AgreementFilter = (props) => (
//   <Filter {...props}>
//     <TextInput label="Søg" source="q" alwaysOn />
//     <HasPayment alwaysOn />
//   </Filter>
// );

const postRowStyle = (record, index) => ({
  backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
});

export const AgreementList = (props) => {
  console.log(props)
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { permissions } = usePermissions();
  console.log(permissions)
  return (
    <div>
      <List {...props}>
        {isSmall ? (
          <SimpleList
            primaryText={record => `Betalingsmetode: ${record.content.paymentMethod}`}
            secondaryText={record => `Beskrivelse: ${record.content.description}`}
            tertiaryText={record => `Status: ${record.state.state}`}
            linkType={"show"}
            rowStyle={postRowStyle}
          />
        ) : (
            <Datagrid rowClick="show">,
              { permissions === 'superbruger' && <Button />}
              <ShowButton label={'Åben'} />
              <TextField source="content.description" label={'Aftalenavn'} />
              <TextField source="content.paymentMethod" label={'Betalingsmetode'} />
              <TextField source="versionDateTime" label="Oprettet" />
              <TextField source="state.state" label="Organisation" />
              <TextField source="state.source" label="Kilde" />
            </Datagrid>
          )}
      </List>
    </div>
  );
};