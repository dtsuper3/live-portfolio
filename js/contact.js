$(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        e.preventDefault();

        const url = "https://polar-chamber-97292.herokuapp.com/contact";
        // const url = "http://localhost:35001/contact";
        const body = {
            "email": $("#form_email").val(),
            "name": $("#form_name").val(),
            "message": $("#form_message").val(),
        }
        // console.log(body)
        // POST values in the background the the script URL
        let valid = true;
        for (const key in body) {
            if (body[key].length == 0) {
                valid = false
                break;
            }
        }
        // console.log({ valid })
        if (valid) {
            // $.ajax({
            //     url: url,
            //     type: "POST",
            //     contentType: 'application/json',
            //     data: JSON.stringify(body),
            //     success: function (data) {
            //         // data = JSON object that contact.php returns
            //         console.log(data)
            //         // we recieve the type of the message: success x danger and apply it to the 
            //         var messageAlert = 'alert-' + data.type;
            //         var messageText = data.message;

            //         // let's compose Bootstrap alert box HTML
            //         var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

            //         // If we have messageAlert and messageText
            //         if (messageAlert && messageText) {
            //             // inject the alert to .messages div in our form
            //             $('#contact-form').find('.messages').html(alertBox);
            //             // empty the form
            //             $('#contact-form')[0].reset();
            //         }
            //     },
            //     error: function (request, error) {
            //         console.log(error);
            //     },
            // });
            const sendMessageBtn = $("#send-message")
            sendMessageBtn.prop('disabled', true);
            sendMessageBtn.text("Wait...")
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(resData => {
                    // console.log(resData)
                    sendMessageBtn.prop('disabled', false);
                    sendMessageBtn.text("Send Message")
                    const messageAlert = `alert-${resData.ok ? "info" : "danger"}`;
                    const messageText = resData.ok ? "Email sent successfully" : "Error Occured";

                    // let's compose Bootstrap alert box HTML
                    const alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }).catch(err => {
                    // console.log(err);
                    sendMessageBtn.prop('disabled', false);
                    sendMessageBtn.text("Send Message")
                })
        }
        return false;
    })
});