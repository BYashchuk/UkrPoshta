
let getShop = (shop) =>{
    alert(shop)
}

//post to create product

// function create(shop) {
//     console.log('create product for ' + shop);
//     $.ajax({
//         url: '/shopify/app/create-product?shop=' + shop,
//         type: 'Post',
//         success: function (result) {
//             console.log(result);
//         }
//     });
// }

//create product by user input
// function createByUser(shop) {

//     let title = $("#title").val();
//     let body_html = $("#body_html").val();
//     let vendor = $("#vendor").val();
//     let product_type = $("#producttype").val();
//     let tags = $("#tags").val();


//     if (title.length > 0) {
//         let product = {
//             title: title,
//             body_html: body_html,
//             vendor: vendor,
//             product_type: product_type,
//             tags: tags
//         }


//         $.ajax({
//             url: '/shopify/app/create-product?shop=' + shop,
//             type: 'Post', processData: false,
//             data: JSON.stringify(product),
//             contentType: "application/json; charset=utf-8",
//             dataType: "json",
//             success: function (result) {
//                 console.log(result);
//                 if (result) {
//                     view(shop);
//                 }
//             }
//         });
//     } else {
//         alert('Enter a title first');
//     }

// }
// $(document).ready(function () {
//     $("#gettord").click()
//     view()
// });
//view products
function view(orderId, shop) {

    $.ajax({
        url: '/shopify/app/products?shop=' + shop + '&id=' + orderId,
        type: 'Get',
        success: function (result) {
            console.log(result);
         
            viewdata(result)
        }
    });
}


function viewdata(result) {
    
    if ((result.order).hasOwnProperty('shipping_address')) {

        jQuery('[data-name=postcodeRecipient]').val(result.order.shipping_address.zip)
        jQuery('[data-name=regionRecipient]').val(result.order.shipping_address.province)
        jQuery('[data-name=cityRecipient]').val(result.order.shipping_address.city)
        jQuery('[data-name=districtRecipient]').val(result.order.shipping_address.province)
        jQuery('[data-name=streetRecipient]').val(result.order.shipping_address.address1)
        jQuery('[data-recipient=firstName]').val(result.order.shipping_address.first_name)
        jQuery('[data-recipient=lastName]').val(result.order.shipping_address.last_name)
        jQuery('[data-recipient=phoneNumber]').val(result.order.shipping_address.phone)

    } 
    
    
    if (result.order.note_attributes.length !== 0) {
        $('#showBarCode').css('display', 'block')
        $('#resultBarcode').text(result.order.note_attributes[0].value)
        // $("#shoTrackNum").click()
        // $("#enterYouOrderAdress").css('display', 'none')
        // $("#youOrderBarcode").css('display', 'block')

       
    }
}

// let shoTrackNum = e =>{
//     e.preventDefault();
//     const userBearer = jQuery("#userBearer").val()
//     let barcode =  $('#resultBarcode').text()

//     jQuery.ajax({
//         type: 'GET',
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             "Authorization": "Bearer " + userBearer
//         },
//         url: 'https://cors-anywhere.herokuapp.com/' + 'https://www.ukrposhta.ua/status-tracking/0.0.1/statuses/last?barcode=' + barcode,

//         success: function (data) {
//             console.log(data)
// $('#barcodeBarcode').text(barcode)
//             $('#barcodeDate').text(data.date)
//             $('#barcodeIndex').text(data.index)
//             $('#barcodeName').text(data.name)
//             $('#barcodeEventName').text(data.eventName)
//             $('#barcodeCountry').text(data.country)
//         }
//     })
// }






//add products to table
// function addRows(products) {
//     $("#products tbody").empty();
//     products.forEach(element => {
//         let row = '<tr><th scope="row">' + element.id + '</th><td>' + element.title + '</td><td>' + element.body_html +
//             '</td><td>' + element.vendor + '</td><td>' + element.product_type + '</td><td>' + element.tags + '</td><td><a id="' + element.id + '" onclick="deleteProduct(this.id,userShop)" href="#">Delete</a> | <a id="' + element.id + '" onclick="selectImage(this.id)" href="#">Add Image</a></td></tr>';
//         $("#products tbody").append(row);
//     });
// }

// function clearFields() {
//     $("#title").val('');
//     $("#body_html").val('');
//     $("#vendor").val('');
//     $("#producttype").val('');
//     $("#tags").val('');
// }

// function deleteProduct(id, shop) {
//     $.ajax({
//         url: '/shopify/app/delete?shop=' + shop + '&id=' + id,
//         type: 'Post',
//         success: function (result) {
//             console.log(result);
//             view(shop);
//         }
//     });
// }

// function selectImage(id) {

//     $("#uploadImageId").val(id);
//     $('#exampleModalCenter').modal('show');
// }

// function uploadImage() {
//     let fd = new FormData();
//     let files = $('#productImage')[0].files[0];
//     fd.append('file', files);
//     let filename = $('#productImage')[0].files[0].name;

//     $.ajax({
//         url: '/shopify/app/file-upload?shop=' + userShop + '&id=' + $("#uploadImageId").val() + '&filename=' + filename,
//         type: 'post',
//         data: fd,
//         contentType: false,
//         processData: false,
//         success: function (response) {
//             if (response != 0) {
//                 console.log(response);
//                 $('#exampleModalCenter').modal('hide');
//                 alert("Image uploaded");
//             } else {
//                 alert('file not uploaded');
//             }
//         },
//     });
// }

/* Fundraising Grader
*
* Generic Copyright, yadda yadd yadda
*
* Plug-ins: jQuery Validate, jQuery 
* Easing
*/

$(document).ready(function () {
    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;
    $(".steps").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function (element) {
            $(element).next('span').show();
        },
        unhighlight: function (element) {
            $(element).next('span').hide();
        }
    });
    $(".next").click(function () {
        $(".steps").validate({
            errorClass: 'invalid',
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.insertAfter(element.next('span').children());
            },
            highlight: function (element) {
                $(element).next('span').show();
            },
            unhighlight: function (element) {
                $(element).next('span').hide();
            }
        });
        if ((!$('.steps').valid())) {
            return true;
        }
        if (animating) return false;
        animating = true;
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.animate({
            opacity: 0
        }, {
                step: function (now, mx) {
                    scale = 1 - (1 - now) * 0.2;
                    left = (now * 50) + "%";
                    opacity = 1 - now;
                    current_fs.css({
                        'transform': 'scale(' + scale + ')'
                    });
                    next_fs.css({
                        'left': left,
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutExpo'
            });
    });
    $(".submit").click(function () {
        $(".steps").validate({
            errorClass: 'invalid',
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.insertAfter(element.next('span').children());
            },
            highlight: function (element) {
                $(element).next('span').show();
            },
            unhighlight: function (element) {
                $(element).next('span').hide();
            }
        });
        if ((!$('.steps').valid())) {
            return false;
        }
        if (animating) return false;
        animating = true;
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.animate({
            opacity: 0
        }, {
                step: function (now, mx) {
                    scale = 1 - (1 - now) * 0.2;
                    left = (now * 50) + "%";
                    opacity = 1 - now;
                    current_fs.css({
                        'transform': 'scale(' + scale + ')'
                    });
                    next_fs.css({
                        'left': left,
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutExpo'
            });
    });
    $(".previous").click(function () {
        if (animating) return false;
        animating = true;
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
        previous_fs.show();
        current_fs.animate({
            opacity: 0
        }, {
                step: function (now, mx) {
                    scale = 0.8 + (1 - now) * 0.2;
                    left = ((1 - now) * 50) + "%";
                    opacity = 1 - now;
                    current_fs.css({
                        'left': left
                    });
                    previous_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutExpo'
            });
    });
});
jQuery(document).ready(function () {
    jQuery("#edit-submitted-acquisition-amount-1,#edit-submitted-acquisition-amount-2,#edit-submitted-cultivation-amount-1,#edit-submitted-cultivation-amount-2,#edit-submitted-cultivation-amount-3,#edit-submitted-cultivation-amount-4,#edit-submitted-retention-amount-1,#edit-submitted-retention-amount-2,#edit-submitted-constituent-base-total-constituents").keyup(function () {
        calcTotal();
    });
});

function calcTotal() {
    var grade = 0;
    var donorTotal = Number(jQuery("#edit-submitted-constituent-base-total-constituents").val().replace(/,/g, ""));
    if (donorTotal) {
        donorTotal = parseFloat(donorTotal);
    } else {
        donorTotal = 0;
    }
    grade += getBonusDonorPoints(donorTotal);
    var acqAmount1 = Number(jQuery("#edit-submitted-acquisition-amount-1").val().replace(/,/g, ""));
    var acqAmount2 = Number(jQuery("#edit-submitted-acquisition-amount-2").val().replace(/,/g, ""));
    var acqTotal = 0;
    if (acqAmount1) {
        acqAmount1 = parseFloat(acqAmount1);
    } else {
        acqAmount1 = 0;
    }
    if (acqAmount2) {
        acqAmount2 = parseFloat(acqAmount2);
    } else {
        acqAmount2 = 0;
    }
    if (acqAmount1 > 0 && acqAmount2 > 0) {
        acqTotal = ((acqAmount2 - acqAmount1) / acqAmount1 * 100).toFixed(2);
    } else {
        acqTotal = 0;
    }
    jQuery("#edit-submitted-acquisition-percent-change").val(acqTotal + '%');
    grade += getAcquisitionPoints(acqTotal);
    console.log(grade);
    var cultAmount1 = Number(jQuery("#edit-submitted-cultivation-amount-1").val().replace(/,/g, ""));
    var cultAmount2 = Number(jQuery("#edit-submitted-cultivation-amount-2").val().replace(/,/g, ""));
    var cultTotal = 0;
    if (cultAmount1) {
        cultAmount1 = parseFloat(cultAmount1);
    } else {
        cultAmount1 = 0;
    }
    if (cultAmount2) {
        cultAmount2 = parseFloat(cultAmount2);
    } else {
        cultAmount2 = 0;
    }
    if (cultAmount1 > 0 && cultAmount2 > 0) {
        cultTotal = ((cultAmount2 - cultAmount1) / cultAmount1 * 100).toFixed(2);
    } else {
        cultTotal = 0;
    }
    jQuery("#edit-submitted-cultivation-percent-change1").val(cultTotal + '%');
    grade += getAcquisitionPoints(cultTotal);
    var cultAmount3 = Number(jQuery("#edit-submitted-cultivation-amount-3").val().replace(/,/g, ""));
    var cultAmount4 = Number(jQuery("#edit-submitted-cultivation-amount-4").val().replace(/,/g, ""));
    if (cultAmount3) {
        cultAmount3 = parseFloat(cultAmount3);
    } else {
        cultAmount3 = 0;
    }
    if (cultAmount4) {
        cultAmount4 = parseFloat(cultAmount4);
    } else {
        cultAmount4 = 0;
    }
    if (cultAmount3 > 0 && cultAmount4 > 0) {
        cultTotal2 = ((cultAmount4 - cultAmount3) / cultAmount3 * 100).toFixed(2);
    } else {
        cultTotal2 = 0;
    }
    jQuery("#edit-submitted-cultivation-percent-change2").val(cultTotal2 + '%');
    grade += getAcquisitionPoints(cultTotal2);
    var retAmount1 = Number(jQuery("#edit-submitted-retention-amount-1").val().replace(/,/g, ""));
    var retAmount2 = Number(jQuery("#edit-submitted-retention-amount-2").val().replace(/,/g, ""));
    var retTotal = 0;
    if (retAmount1) {
        retAmount1 = parseFloat(retAmount1);
    } else {
        retAmount1 = 0;
    }
    if (retAmount2) {
        retAmount2 = parseFloat(retAmount2);
    } else {
        retAmount2 = 0;
    }
    if (retAmount1 > 0 && retAmount2 > 0) {
        retTotal = (retAmount2 / retAmount1 * 100).toFixed(2);
    } else {
        retTotal = 0;
    }
    jQuery("#edit-submitted-retention-percent-change").val(retTotal + '%');
    grade += getAcquisitionPoints(retTotal);
    jQuery("#edit-submitted-final-grade-grade").val(grade + ' / 400');
}

function getAcquisitionPoints(val) {
    if (val < 1) {
        return 0;
    } else if (val >= 1 && val < 6) {
        return 50;
    } else if (val >= 6 && val < 11) {
        return 60;
    } else if (val >= 11 && val < 16) {
        return 70;
    } else if (val >= 16 && val < 21) {
        return 75;
    } else if (val >= 21 && val < 26) {
        return 80;
    } else if (val >= 26 && val < 31) {
        return 85;
    } else if (val >= 31 && val < 36) {
        return 90;
    } else if (val >= 36 && val < 41) {
        return 95;
    } else if (val >= 41) {
        return 100;
    }
}

function getCultivationGiftPoints(val) {
    if (val < 1) {
        return 0;
    } else if (val >= 1 && val < 4) {
        return 50;
    } else if (val >= 4 && val < 7) {
        return 60;
    } else if (val >= 7 && val < 10) {
        return 70;
    } else if (val >= 10 && val < 13) {
        return 75;
    } else if (val >= 13 && val < 16) {
        return 80;
    } else if (val >= 16 && val < 21) {
        return 85;
    } else if (val >= 21 && val < 26) {
        return 90;
    } else if (val >= 26 && val < 51) {
        return 95;
    } else if (val >= 51) {
        return 100;
    }
}

function getCultivationDonationPoints(val) {
    if (val < 1) {
        return 0;
    } else if (val >= 1 && val < 6) {
        return 50;
    } else if (val >= 6 && val < 11) {
        return 60;
    } else if (val >= 11 && val < 16) {
        return 70;
    } else if (val >= 16 && val < 21) {
        return 75;
    } else if (val >= 21 && val < 26) {
        return 80;
    } else if (val >= 26 && val < 31) {
        return 85;
    } else if (val >= 31 && val < 36) {
        return 90;
    } else if (val >= 36 && val < 41) {
        return 95;
    } else if (val >= 41) {
        return 100;
    }
}

function getRetentionPoints(val) {
    if (val < 1) {
        return 0;
    } else if (val >= 1 && val < 51) {
        return 50;
    } else if (val >= 51 && val < 56) {
        return 60;
    } else if (val >= 56 && val < 61) {
        return 70;
    } else if (val >= 61 && val < 66) {
        return 75;
    } else if (val >= 66 && val < 71) {
        return 80;
    } else if (val >= 71 && val < 76) {
        return 85;
    } else if (val >= 76 && val < 81) {
        return 90;
    } else if (val >= 81 && val < 91) {
        return 95;
    } else if (val >= 91) {
        return 100;
    }
}

function getBonusDonorPoints(val) {
    if (val < 10001) {
        return 0;
    } else if (val >= 10001 && val < 25001) {
        return 10;
    } else if (val >= 25001 && val < 50000) {
        return 15;
    } else if (val >= 50000) {
        return 20;
    }
}
var modules = {
    $window: $(window),
    $html: $('html'),
    $body: $('body'),
    $container: $('.container'),
    init: function () {
        $(function () {
            modules.modals.init();
        });
    },
    modals: {
        trigger: $('.explanation'),
        modal: $('.modal'),
        scrollTopPosition: null,
        init: function () {
            var self = this;
            if (self.trigger.length > 0 && self.modal.length > 0) {
                modules.$body.append('<div class="modal-overlay"></div>');
                self.triggers();
            }
        },
        triggers: function () {
            var self = this;
            self.trigger.on('click', function (e) {
                e.preventDefault();
                var $trigger = $(this);
                self.openModal($trigger, $trigger.data('modalId'));
            });
            $('.modal-overlay').on('click', function (e) {
                e.preventDefault();
                self.closeModal();
            });
            modules.$body.on('keydown', function (e) {
                if (e.keyCode === 27) {
                    self.closeModal();
                }
            });
            $('.modal-close').on('click', function (e) {
                e.preventDefault();
                self.closeModal();
            });
        },
        openModal: function (_trigger, _modalId) {
            var self = this,
                scrollTopPosition = modules.$window.scrollTop(),
                $targetModal = $('#' + _modalId);
            self.scrollTopPosition = scrollTopPosition;
            modules.$html.addClass('modal-show').attr('data-modal-effect', $targetModal.data('modal-effect'));
            $targetModal.addClass('modal-show');
            modules.$container.scrollTop(scrollTopPosition);
        },
        closeModal: function () {
            var self = this;
            $('.modal-show').removeClass('modal-show');
            modules.$html.removeClass('modal-show').removeAttr('data-modal-effect');
            modules.$window.scrollTop(self.scrollTopPosition);
        }
    }
}
modules.init();