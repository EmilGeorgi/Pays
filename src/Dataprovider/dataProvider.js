import * as React from 'react'
import { fetchUtils, Loading } from 'react-admin';
import { stringify } from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import { data } from 'jquery';
import { contactEdit } from '../contact/contactEdit';

const apiUrl = '/api';
const dawaApi = 'https://dawa.aws.dk'
const httpClient = fetchUtils.fetchJson;
const redirectUrl = location.origin;
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('');
}

export default {
    getList: async (resource, params) => {
        let merchantId = '';
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const tempArr = [];
        global.select ? merchantId = '/merchants/' + global.select : location.replace(redirectUrl);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let url;
        if (resource === 'autocomplete') {
            url = `${dawaApi}/${resource}?q=${params.filter.q}`;
        } else {
            url = `${apiUrl}${merchantId}/${resource}?sort=${field}&order=${order}&_end=${page * perPage - 1}&_start=${(page - 1) * perPage}&filter=${stringify(params.filter)}`;
        }
        return httpClient(url).then(({ header, json }) => {
            json.map((value) => {
                if (value.versionDateTime) {
                    value.versionDateTime = new Date(value.versionDateTime.substring(0, 4), (value.versionDateTime.substring(5, 6)) - 1, value.versionDateTime.substring(6, 8), value.versionDateTime.substring(8, 10), value.versionDateTime.substring(10, 12), value.versionDateTime.substring(12, 14)).toLocaleString('da-DK')
                }
                if (value.content) {
                    if (value.content.dueDate) {
                        value.content.dueDate = new Date(value.content.dueDate.substring(0, 4), (value.content.dueDate.substring(5, 6)) - 1, value.content.dueDate.substring(6, 8)).toLocaleDateString('da-DK', options)
                    }
                    if (value.content.phone) {
                        value.content.phone = value.content.phone.length > 8 ? `+${value.content.phone.substring(0, 2)} ${value.content.phone.substring(2)}` : `+45 ${value.content.phone}`
                    }
                    value.id = value.content.id
                }
                if (value.data) {
                    value.id = value.data.id
                }
                else if (!value.id) {
                    value.id = uuidv4().toString().replace(/-/g, '');
                }
                tempArr.push(value)
            })
            return (
                {
                    data: tempArr,
                    total: parseInt(json.length),
                }
            )
        });
    },

    getOne: (resource, params) => {
        let url;
        if (resource === 'autocomplete') {
            url = `${dawaApi}/${resource}?q=${params.filter.q}`;
        } else {
            url = apiUrl
        }
        return httpClient(`${url}/${resource}/${params.id}`).then(({ json }) => {
            if (!global.select) location.replace(redirectUrl);
            if (json.versionDateTime)
                json.versionDateTime = new Date(`${json.versionDateTime.substring(0, 4)}-${json.versionDateTime.substring(4, 6)}-${json.versionDateTime.substring(6, 8)}`)
            if (json.content.phone) {
                json.content.phone = json.content.phone.length > 8 ? `+${json.content.phone.substring(0, 2)} ${json.content.phone.substring(2)}` : `+45${json.content.phone}`
            }
            json.id = json.content.id
            return {
                data: json,
            }
        })
    },

    getMany: (resource, params) => {
        if (!global.select) location.replace(redirectUrl);
        const url = resource === 'autocomplete' ? `${dawaApi}/${resource}?id=${params.ids}` : `${apiUrl}/${resource}/${params.ids}`;
        return httpClient(url).then(({ json }) => {
            const tempArr = []
            if (json.content) {
                json.id = json.content.id
                if (json.content.phone) {
                    json.content.phone = json.content.phone.length > 8 ? `+${json.content.phone.substring(0, 2)} ${json.content.phone.substring(2)}` : `+45 ${json.content.phone}`
                }
            }
            if (resource === 'autocomplete') {
                json = json[0]
                if (json.data) {
                    json.id = json.data.id
                }
                else {
                    json.tekst = json.data
                    json.id = uuidv4().toString().replace(/-/g, '');
                }
            }
            tempArr.push(json);
            return { data: tempArr }
        })
    },

    getManyReference: (resource, params) => {
        if (!global.select) location.replace(redirectUrl);
        const url = resource === 'autocomplete' ? `${dawaApi}/${resource}/` : `${apiUrl}/${location.toString().split('/')[4]}/${params.id}/${resource}`;
        return httpClient(url).then(({ headers, json }) => {
            const returnArr = []
            json.map((data) => {
                if (data.versionDateTime)
                    data.versionDateTime = new Date(data.versionDateTime.substring(0, 4), (data.versionDateTime.substring(5, 6)) - 1, data.versionDateTime.substring(6, 8), data.versionDateTime.substring(8, 10), data.versionDateTime.substring(10, 12), data.versionDateTime.substring(12, 14)).toLocaleString('da-DK')
                data.id = data.content.id
                returnArr.push(data);
            })
            return {
                data: returnArr,
                total: returnArr.length,
            }
        });
    },

    update: (resource, params) => {
        Object.keys(params.data.content).forEach(function (k) {
            params.data[k] = params.data.content[k]
        });
        if (resource === 'merchants') {
            if (params.data.mobilePaySubscriptionSettings) {
                params.data.mobilePaySubscriptionSettings.notificationsOn = params.data.content.mobilePaySubscriptionSettings.notificationsOn ? true : false
            }
        }
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            json.id = json.content.id
            return {
                data: json
            }
        })
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => {
        if (resource === "contacts") {
            if (params.data.dawaAddress) {
                return fetch(`${dawaApi}/autocomplete?id=${params.data.dawaAddress}`).then((val) => {
                    if (val.status > 300) {
                    }
                    else {
                        return val.json();
                    }
                }).then((data) => {
                    if (data) {
                        const _dawaAdress = {}
                        const dawaAddressId = data[0].data.id
                        _dawaAdress.status = data[0].data.status
                        _dawaAdress.darstatus = data[0].data.darstatus
                        _dawaAdress.id = dawaAddressId;
                        _dawaAdress.vejkode = data[0].data.vejkode;
                        _dawaAdress.vejnavn = data[0].data.vejnavn;
                        _dawaAdress.adresseringsvejnavn = data[0].data.adresseringsvejnavn;
                        _dawaAdress.husnr = data[0].data.husnr;
                        _dawaAdress.etage = data[0].etage || '';
                        _dawaAdress.doer = data[0].dør || '';
                        _dawaAdress.supplerendebynavn = data[0].data.supplerendebynavn || '';
                        _dawaAdress.postnr = data[0].data.postnr;
                        _dawaAdress.postnrnavn = data[0].data.postnrnavn;
                        _dawaAdress.stormodtagerpostnr = data[0].data.stormodtagerpostnummer || '';
                        _dawaAdress.stormodtagerpostnrnavn = data[0].data.stormodtagerpostnummer || '';
                        _dawaAdress.kommunekode = data[0].data.kommunekode;
                        _dawaAdress.adgangsadresseid = data[0].data.adgangsadresseid;
                        _dawaAdress.x = data[0].data.x;
                        _dawaAdress.y = data[0].data.y;
                        _dawaAdress.href = data[0].data.href;
                        return httpClient(`${apiUrl}/dawaAddresses`, {
                            method: 'POST',
                            body: JSON.stringify(_dawaAdress),
                        }).then((dawa) => {
                            params.data.customFields = { test: 'test' }
                            params.data.address = data[0].tekst
                            params.data.merchantId = global.select;
                            params.data.id = uuidv4().toString().replace(/-/g, '');
                            params.data.dawaAddressId = dawaAddressId
                            return httpClient(`${apiUrl}/${resource}`, {
                                method: 'POST',
                                body: JSON.stringify(params.data),
                            }).then((contact => {
                                contact.json.id = contact.json.content.id;
                                return { data: contact.json }
                            }))
                        })
                    }
                    return Promise.reject();
                })
            }
            else {
                params.data.address = inputValue
                params.data.merchantId = global.select;
                params.data.dawaAddressId = null
                return httpClient(`${apiUrl}/${resource}`, {
                    method: 'POST',
                    body: JSON.stringify(params.data),
                }).then((contact => {
                    contact.json.id = contact.json.content.id;
                    return { data: contact.json }
                }))
            }
        }
        else {
            if (params.data)
                params.data.merchantId = global.select;
                params.data.customFields = {'':''}
                if (params.data.values) {
                if (params.data.values.contactId)
                    params.data.contactId = params.data.values.contactId
                params.data.values = null;
            }
            if (params.data.mobilePaySubscriptionAgreement) {
                if (params.data.notificationMethod === 'ingen') {
                    params.data.notificationMethod = null
                }
                params.data.mobilePaySubscriptionAgreement.frequency = Number.parseFloat(params.data.mobilePaySubscriptionAgreement.frequency)
                params.data.mobilePaySubscriptionAgreement.nextPaymentDate = params.data.mobilePaySubscriptionAgreement.nextPaymentDate.toString().replace(/-/g, '')
                if (params.data.mobilePaySubscriptionAgreement.category) {
                    if (params.data.mobilePaySubscriptionAgreement.category.length === 0) {
                        params.data.mobilePaySubscriptionAgreement.category = null
                    }
                }
            }
            return httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
                headers: new Headers({ 'Content-Type': 'application/json' })
            }).then(({ json }) => {
                json.id = json.content.id
                return {
                    data: json
                }
            })
        }
    },

    delete: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/${params.id}/delete`, {
            method: 'POST',
        }).then(({ json }) => {
            return {
                data: json
            }
        })
    },
    deleteMany: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/${params.ids}/delete`, {
            method: 'POST',
        }).then(({ json }) => ({ data: json }));
    },
};