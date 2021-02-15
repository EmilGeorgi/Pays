import React, { createRef } from "react";
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

export default class IframeGen extends React.Component {
    iframeGenerated = []
    fb = createRef();
    componentDidMount() {
          $(this.fb.current).formBuilder();
          const iframeGeneratedtemp = []
          const $textarea = $("textarea");
          const $iframe = $('#iframe');
            $('#genIframe').on('click' ,function() {
              $iframe.removeAttr('srcdoc');
              $iframe.contents().find('body').html('');
              $textarea.val('');
              let htmlFormElements = []
              console.log($textarea)
              $iframe.ready(function() {
                for(let i = 0; i < $('.prev-holder').length; i++) {
                  htmlFormElements.push($('.prev-holder')[i]);
                }
                console.log(htmlFormElements)
                for (let index = 0; index < htmlFormElements.length; index++) {
                  $($iframe).contents().find("body").append(htmlFormElements[index].innerHTML)                
                }
                $iframe.attr('srcdoc', $($iframe).contents().find("body").html())
                let iframeDocument = $iframe.contents().get(0);
                $textarea.val("<iframe srcdoc='" + iframeDocument.documentElement.outerHTML + "'>");
                iframeGeneratedtemp.push({'name': 'iframeGenerated', 'content': $($iframe).contents().find("body").html(), 'source': $textarea.val()})
                if ($('#table')) {
                  $('#table').remove()
                }
                let html = document.createElement('table');
                html.id = 'table';
                html.classList.add('MuiTable-root', 'RaDatagrid-table-86');
                let thead = document.createElement('thead');
                thead.classList.add('MuiTableHead-root', 'RaDatagrid-thead-87');
                let tr = document.createElement('tr');
                tr.classList.add('MuiTableRow-root', 'RaDatagrid-row-92', 'RaDatagrid-headerRow-89', 'MuiTableRow-head');
                let th1 = document.createElement('th');
                th1.classList.add('MuiTableCell-root', 'MuiTableCell-head', 'RaDatagrid-headerCell-90', 'MuiTableCell-paddingCheckbox', 'MuiTableCell-sizeSmall');
                th1.append(document.createElement('span').innerText = 'name');
                tr.append(th1);
                thead.append(tr);
                html.append(thead);
                let tbody = document.createElement('tbody');
                tbody.classList.add('MuiTableBody-root', 'datagrid-body', 'RaDatagrid-tbody-88');
                for(let j = 0; j < iframeGeneratedtemp.length; j++) {
                  let list = document.createElement('tr')
                  list.classList.add('MuiTableRow-root', 'RaDatagrid-row-92', 'RaDatagrid-rowEven-94', 'RaDatagrid-clickableRow-93', 'MuiTableRow-hover');
                  let td1 = document.createElement('td');
                  td1.classList.add('iframelink', 'MuiButtonBase-root', 'MuiButton-root', 'MuiButton-text')
                  td1.append(document.createElement('span').innerText = iframeGeneratedtemp[j].name);
                  list.append(td1);
                  tbody.append(list)
                }  
                html.append(tbody);
                $('#iframeGenerated').append(html);
              });
          })
    }

    render() { 
        return (
            <div>
              <div id="fb-editor" ref={this.fb} />
              <Button id={'genIframe'}>Generate iframe</Button>
              <div>
                <List component="div" id={'iframeGenerated'} aria-label="main mailbox folders">
                </List>
              </div>
                <iframe height="400px" width="100%" id="iframe" title="Preview"></iframe>
                <textarea style={{'width': '100%', 'height': '500px'}} id="iframeholder"></textarea>
            </div>
        );
    }
}