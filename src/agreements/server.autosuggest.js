import * as React from "react";
import Autosuggest from 'react-autosuggest';
// import './autosuggest.css';
import { required, AutocompleteInput, ReferenceInput } from 'react-admin';
import ChipInput from 'material-ui-chip-input';
import { withStyles, createStyles } from '@material-ui/core/styles';

class ServerAutoSuggest extends React.Component {
    constructor(props) {
        super(props);

        //Define state for value and suggestion collection
        this.state = {
            value: '',
            suggestions: []
        };
    }

    // Filter logic
    getSuggestions = (value) => {

        const inputValue = value ? value.trim().toLowerCase() : '';
        return fetch("https://dawa.aws.dk/autocomplete?q=" + inputValue).then((response) => {
            return response.json()
        }).then((data) => {
            if (data.length > 0) {
                document.getElementById('dawaSuggest').style.borderColor = 'yellow'
            }
            else if (data.length === 1) {
                document.getElementById('dawaSuggest').style.borderColor = 'green'
            }
            console.log(data)
            return data;
        });
    };

    // Trigger suggestions
    getSuggestionValue = suggestion => suggestion.tekst;

    // Render Each Option
    renderSuggestion = suggestion => (
        <span className="sugg-option">
            {suggestion.tekst}
        </span>
    );

    // OnChange event handler
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Suggestion rerender when user types
    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
            .then(data => {
                if (data.Error) {
                    this.setState({
                        suggestions: []
                    });
                } else {
                    this.setState({
                        suggestions: data
                    });
                }
            })
    };

    // Triggered on clear
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        console.log(suggestions)
        // Option props
        const inputProps = {
            value,
            onChange: this.onChange
        };

        // Adding AutoSuggest component
        return (
            // <AutocompleteArrayInput source="autocomplete" id="dawaSuggest" choices={suggestions} optionText="tekst" optionValue="data.id" setFilter={this.getSuggestions} shouldRenderSuggestions={(suggestions) => suggestions.trim() > 2} />
            <ReferenceInput
                source="dawaAddress"
                reference="autocomplete"
                label="addresse"
                style={{'width': '100%'}}>
                <AutocompleteInput style={{'width': '100%'}} optionText="tekst" optionValue="id" />
            </ReferenceInput>

            // <AutocompleteInput source="category" optionText={'tekst'} optionValue={'data.id'} onChange={this.onChange} choices={suggestions} />
            // <div className="MuiFormControl-root MuiTextField-root RaFormInput-input-52 MuiFormControl-marginDense" style={{ 'maxWidth': '100%', marginBottom: '200px', 'borderBottom': '1px solid rgba(0, 0, 0, 0.42)' }}>
            //     <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-marginDense MuiInputLabel-filled" data-shrink="false" for="adresse" id="email-label"><span>adresse *</span></label>
            //     <div className="MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-formControl MuiInputBase-marginDense MuiFilledInput-marginDense" id="dawaSuggest" style={{ "height": "48px" }}>
            //         <Autosuggest id="adresse"
            //             aria-invalid="false"
            //             aria-describedby="adresse-helper-text"
            //             name="adresse"
            //             className="MuiInputBase-input MuiFilledInput-input MuiInputBase-inputMarginDense MuiFilledInput-inputMarginDense"
            //             style={{ 'maxWidth': '100%' }}
            //             suggestions={suggestions}
            //             onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            //             onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            //             getSuggestionValue={this.getSuggestionValue}
            //             renderSuggestion={this.renderSuggestion}
            //             inputProps={inputProps}
            //             validate={required()}
            //         />
            //     </div>
            //     <p class="MuiFormHelperText-root MuiFormHelperText-contained MuiFormHelperText-marginDense" id="adresse-helper-text"><span>​</span></p>
            // </div>
        );
    }
}

export default ServerAutoSuggest;