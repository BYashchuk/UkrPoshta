// Нужно:
//       Создать адрес отправителя и адрес получателя
//       Создать клиента отправителя и клиента получателя
//       Создать отправление
const userBearer = jQuery("#userBearer").val()
const userToken = jQuery("#userToken").val()
const userUUID = jQuery("#userUUID").val()

      
        

let addAddressesSender = (e) => {
    e.preventDefault();
    let country = jQuery('[data-name=passRegionSender]').val()
    let postcode = jQuery('[data-name=postcodeSender]').val()
    let region = jQuery('[data-name=regionSender]').val()
    let city = jQuery('[data-name=citySender]').val()
    let district = jQuery('[data-name=districtSender]').val()
    let street = jQuery('[data-name=streetSender]').val()
    let houseNumber = jQuery('[data-name=houseNumberSender]').val()
    let apartmentNumber = jQuery('[data-name=apartmentNumberSender]').val()
    $("#sendAllData").css('display', 'none')
    jQuery.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userBearer
        },
        url: 'https://cors-anywhere.herokuapp.com/' + 'https://www.ukrposhta.ua/ecom/0.0.1/addresses',
        data: JSON.stringify({
            "postcode": postcode,
            "country": country,
            "region": region,
            "city": city,
            "district": district,
            "street": street,
            "houseNumber": houseNumber,
            "apartmentNumber": apartmentNumber
        }),
        success: function (data) {
            // console.log(data)
            shoAlertDone('Addresses Sender Done')
            let addressesSenderId = data.id
            addAddressesRecipient(addressesSenderId, e)
        },
        error: function (jqXHR, exception) {
            $("#sendAllData").css('display', 'block')
            if (jqXHR.status === 0) {
                shoAlert('Not connect. Verify Network.')
            } else if (jqXHR.status == 404) {
                shoAlert('Requested page not found. [404]')
            } else if (jqXHR.status == 400) {
                shoAlert('Wrong Data')
            } else if (jqXHR.status == 500) {
                shoAlert('Internal Server Error.')
            } else if (exception === 'parsererror') {
                shoAlert('Requested JSON parse failed.')
            } else if (exception === 'timeout') {
                shoAlert('Time out error.')
            } else if (exception === 'abort') {
                shoAlert('Ajax request aborted.')
            } else {
                shoAlert('Uncaught Error.\n' + jqXHR.responseText)
            }
        }
    });
}

let addAddressesRecipient = (addressesSenderId, e) => {
    e.preventDefault();
    let country = jQuery('[data-name=passRegionRecipient]').val().toUpperCase()
    let postcode = jQuery('[data-name=postcodeRecipient]').val()
    let region = jQuery('[data-name=regionRecipient]').val()
    let city = jQuery('[data-name=cityRecipient]').val()
    let district = jQuery('[data-name=districtRecipient]').val()
    let street = jQuery('[data-name=streetRecipient]').val()
    let houseNumber = jQuery('[data-name=houseNumberRecipient]').val()
    let apartmentNumber = jQuery('[data-name=apartmentNumberRecipient]').val()

    jQuery.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userBearer
        },
        url: 'https://cors-anywhere.herokuapp.com/' + 'https://www.ukrposhta.ua/ecom/0.0.1/addresses',
        data: JSON.stringify({
            "postcode": postcode,
            "country": country,
            "region": region,
            "city": city,
            "district": district,
            "street": street,
            "houseNumber": houseNumber,
            "apartmentNumber": apartmentNumber
        }),
        success: function (data) {
            // console.log(data)
            shoAlertDone('Addresses Recipient Done')
            let addressesRecipientId = data.id
            getClientsSender(addressesRecipientId, addressesSenderId, e)

        },
        error: function (jqXHR, exception) {
            $("#sendAllData").css('display', 'block')
            if (jqXHR.status === 0) {
                shoAlert('Not connect. Verify Network.')
            } else if (jqXHR.status == 404) {
                shoAlert('Requested page not found. [404]')
            } else if (jqXHR.status == 400) {
                shoAlert('Wrong Data')
            } else if (jqXHR.status == 500) {
                shoAlert('Internal Server Error.')
            } else if (exception === 'parsererror') {
                shoAlert('Requested JSON parse failed.')
            } else if (exception === 'timeout') {
                shoAlert('Time out error.')
            } else if (exception === 'abort') {
                shoAlert('Ajax request aborted.')
            } else {
                shoAlert('Uncaught Error.\n' + jqXHR.responseText)
            }
        }
    });
}





let getClientsSender = (addressesRecipientId, addressesSenderId, e) => {
    e.preventDefault();
    let firstName = jQuery('[data-sender=firstName]').val()
    let lastName = jQuery('[data-sender=lastName]').val()
    let middleName = jQuery('[data-sender=middleName]').val()
    let phoneNumber = jQuery('[data-sender=phoneNumber]').val()

    jQuery.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userBearer
            // "Authorization": "Bearer f9027fbb-cf33-3e11-84bb-5484491e2c94"
        },
        url: 'https://cors-anywhere.herokuapp.com/' + `https://www.ukrposhta.ua/ecom/0.0.1/clients?token=${userToken}`,
        // url: 'https://cors-anywhere.herokuapp.com/' + 'https://www.ukrposhta.ua/ecom/0.0.1/clients?token=ba5378df-985e-49c5-9cf3-d222fa60aa68',

        data: JSON.stringify({
            "type": "INDIVIDUAL",
            "firstName": firstName,
            "lastName": lastName,
            "middleName": middleName,
            "addressId": addressesSenderId,
            "phoneNumber": phoneNumber
        }),
        success: function (data) {
            // console.log(data)
            let senderAddressId = data.id
            let clientSenderUUID = data.uuid
            shoAlertDone('Clients Sender Done')
            getClientsRecipient(addressesRecipientId, clientSenderUUID, addressesSenderId, e)
        },
        error: function (jqXHR, exception) {
            $("#sendAllData").css('display', 'block')
            if (jqXHR.status === 0) {
                shoAlert('Not connect. Verify Network.')
            } else if (jqXHR.status == 404) {
                shoAlert('Requested page not found. [404]')
            } else if (jqXHR.status == 400) {
                shoAlert('Wrong Data')
            } else if (jqXHR.status == 500) {
                shoAlert('Internal Server Error.')
            } else if (exception === 'parsererror') {
                shoAlert('Requested JSON parse failed.')
            } else if (exception === 'timeout') {
                shoAlert('Time out error.')
            } else if (exception === 'abort') {
                shoAlert('Ajax request aborted.')
            } else {
                shoAlert('Uncaught Error.\n' + jqXHR.responseText)
            }
        }
    });

}

let getClientsRecipient = (addressesRecipientId, clientSenderUUID, addressesSenderId, e) => {
    e.preventDefault();
    let firstName = jQuery('[data-recipient=firstName]').val()
    let lastName = jQuery('[data-recipient=lastName]').val()
    let middleName = jQuery('[data-recipient=middleName]').val()
    let phoneNumber = jQuery('[data-recipient=phoneNumber]').val()

    jQuery.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userBearer
        },
        url: 'https://cors-anywhere.herokuapp.com/' + `https://www.ukrposhta.ua/ecom/0.0.1/clients?token=${userToken}`,
        data: JSON.stringify({
            "type": "INDIVIDUAL",
            "firstName": firstName,
            "lastName": lastName,
            "middleName": middleName,
            "addressId": addressesRecipientId,
            "phoneNumber": phoneNumber
        }),
        success: function (data) {
            // console.log(data)
            let clientRecipientUUID = data.uuid
            shoAlertDone('Clients Recipient Done')
            getShipments(clientRecipientUUID, clientSenderUUID, addressesSenderId, e)
        },
        error: function (jqXHR, exception) {
            $("#sendAllData").css('display', 'block')
            if (jqXHR.status === 0) {
                shoAlert('Not connect. Verify Network.')
            } else if (jqXHR.status == 404) {
                shoAlert('Requested page not found. [404]')
            } else if (jqXHR.status == 400) {
                shoAlert('Wrong Data')
            } else if (jqXHR.status == 500) {
                shoAlert('Internal Server Error.')
            } else if (exception === 'parsererror') {
                shoAlert('Requested JSON parse failed.')
            } else if (exception === 'timeout') {
                shoAlert('Time out error.')
            } else if (exception === 'abort') {
                shoAlert('Ajax request aborted.')
            } else {
                shoAlert('Uncaught Error.\n' + jqXHR.responseText)
            }
        }
    });

}


let getShipments = (clientRecipientUUID, clientSenderUUID, addressesSenderId, e) => {
    e.preventDefault();

    let weight = Number($("[data-weight=weight]").val())
    let length = Number($("[data-length=length]").val())
    let paidByRecipient = $('#cheap').prop('checked')

    jQuery.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userBearer
        },
        url: 'https://cors-anywhere.herokuapp.com/' + `https://www.ukrposhta.ua/ecom/0.0.1/shipments?token=${userToken}`,
        data: JSON.stringify({
            "sender": {
                "uuid": clientSenderUUID
            },
            "recipient": {
                "uuid": clientRecipientUUID
            },
            "senderAddressId": addressesSenderId,
            "deliveryType": "W2D",
            "paidByRecipient": paidByRecipient,
            "nonCashPayment": false,
            "parcels": [
                {
                    "weight": weight,
                    "length": length
                }
            ]
        }),
        success: function (data) {
            console.log(data)
            shoAlertDone('Shipments Done' + data.barcode)
            trackId(data, e)
        },
        error: function (jqXHR, exception) {
            $("#sendAllData").css('display', 'block')
            if (jqXHR.status === 0) {
                shoAlert('Not connect. Verify Network.')
            } else if (jqXHR.status == 404) {
                shoAlert('Requested page not found. [404]')
            } else if (jqXHR.status == 400) {
                shoAlert('Wrong Data')
            } else if (jqXHR.status == 500) {
                shoAlert('Internal Server Error.')
            } else if (exception === 'parsererror') {
                shoAlert('Requested JSON parse failed.')
            } else if (exception === 'timeout') {
                shoAlert('Time out error.')
            } else if (exception === 'abort') {
                shoAlert('Ajax request aborted.')
            } else {
                shoAlert('Uncaught Error.\n' + jqXHR.responseText)
            }
        }
    })

}

let trackId = (data, e) => {
    e.preventDefault();
    let barcodeId = data.barcode
    let orderId = jQuery("#orderIdTrackId").text()
    let token = (jQuery("#token").text()).toString()
    let shop = jQuery("#shop").text()

    jQuery.ajax({
        type: 'PUT',
        headers: {
            "X-Shopify-Access-Token": token,
            "content-type": "application/json"
        },
        url: "https://cors-anywhere.herokuapp.com/" + "https://" + shop + "/admin/orders/" + orderId + ".json",
        data: JSON.stringify({
            order: {
                note_attributes: [{
                    name: 'orderIsSend',
                    value: barcodeId
                }]
            }

        }),
        success: function (data) {
            console.log(data)
            $("#sendAllData").css('display', 'block')
            shoAlertDone('Tracing Code:' + barcodeId)
            // $('#resultBarcode').text(barcodeId)
            view()
        },
        error: function (jqXHR, exception) {
            $("#sendAllData").css('display', 'block')
            if (jqXHR.status === 0) {
                shoAlert('Not connect. Verify Network.')
            } else if (jqXHR.status == 404) {
                shoAlert('Requested page not found. [404]')
            } else if (jqXHR.status == 400) {
                shoAlert('Wrong Data')
            } else if (jqXHR.status == 500) {
                shoAlert('Internal Server Error.')
            } else if (exception === 'parsererror') {
                shoAlert('Requested JSON parse failed.')
            } else if (exception === 'timeout') {
                shoAlert('Time out error.')
            } else if (exception === 'abort') {
                shoAlert('Ajax request aborted.')
            } else {
                shoAlert('Uncaught Error.\n' + jqXHR.responseText)
            }
        }
    });


}

let shoAlert = msg => {
    $(".alert-msg").text(msg)
    $('.alert-msg').css('display', 'block')
    setTimeout(() => {
        $('.alert-msg').css('display', 'none')
        $(".alert-msg").text(' ')
    }, 9000);
}

let shoAlertDone = msg => {
    $(".alert-msg-done").text(msg)
    $('.alert-msg-done').css('display', 'block')
    setTimeout(() => {
        $('.alert-msg-done').css('display', 'none')
        $(".alert-msg-done").text(' ')
    }, 9000);
}

