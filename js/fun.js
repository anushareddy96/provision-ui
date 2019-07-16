$(function () {

    $(document).ready(function () {
        var original = $(this)
        var platform = original.find('option:selected').attr("value")
        $("#region-group").show()
        var region = $("#region")

        $("optgroup", region).each(function () {
            var optgroup = $(this)
            var label = this.label
            if (label == platform) {
                optgroup.show()
            } else {
                optgroup.hide()
            }
        })
    });

    // Instance Name can't be blank
    $('#iname').on('input', function () {
        var input = $(this);
        var is_name = input.val();
        if (is_name) { input.removeClass("invalid").addClass("valid"); }
        else { input.removeClass("valid").addClass("invalid"); }
    });

    // Instance Name must be alpha numeric
    $('#iname').on('input', function () {
        var input = $(this);
        var re = /^[a-zA-Z0-9]+$/;
        var is_input = re.test(input.val());
        if (is_input) { input.removeClass("invalid").addClass("valid"); }
        else { input.removeClass("valid").addClass("invalid"); }
    });

    $("#provider").on("change", function () {
        var original = $(this)
        var platform = original.find('option:selected').attr("value")
        $("#region-group").show()
        var region = $("#region")

        $("optgroup", region).each(function () {
            var optgroup = $(this)
            var label = this.label
            if (label == platform) {
                optgroup.show()
            } else {
                optgroup.hide()
            }
        })
    });

    // After Form Submitted Validation
    $("#submit-form").click(function (event) {
        var form_data = $("#cloud-requisition").serializeArray();
        var error_free = true;
        for (var input in form_data) {
            var element = $("input[name=" + form_data[input]['name'] + "]");

            if (element.attr("id") == "iname") {
                var valid = element.hasClass("valid");
                var error_element = $("span", element.parent());
                if (!valid) { error_element.removeClass("error").addClass("error_show"); error_free = false; }
                else { error_element.removeClass("error_show").addClass("error"); }
            }
        }
        if (!error_free) {
            event.preventDefault();
        }
        else {
            alert('No errors: Form will be submitted');
            var provider = $("#provider").find('option:selected').attr("value")
            console.log(provider)
            var model = $("#model").find('option:selected').attr("value")
            console.log(model)
            if (provider == "AWS") {
                model == "2xlarge" ? $("#type").attr("value", "t2.2xlarge") :
                    model == "xlarge" ? $("#type").attr("value", "t2.xlarge") :
                        model == "large" ? $("#type").attr("value", "t2.large") :
                            model == "medium" ? $("#type").attr("value", "t2.medium") :
                                model == "small" ? $("#type").attr("value", "t2.small") :
                                    $("#type").attr("value", "t2.micro")
            } else if (provider == "AZURE") {
                model == "2xlarge" ? $("#type").attr("value", "Standard_B8ms") :
                    model == "xlarge" ? $("#type").attr("value", "Standard_B4ms") :
                        model == "large" ? $("#type").attr("value", "Standard_B2ms") :
                            model == "medium" ? $("#type").attr("value", "Standard_B2s") :
                                model == "small" ? $("#type").attr("value", "Standard_B1ms") :
                                    $("#type").attr("value", "Standard_B1s")

            } else if (provider == "GCP") {
                model == "2xlarge" ? $("#type").attr("value", "n1-standard-32") :
                    model == "xlarge" ? $("#type").attr("value", "n1-standard-16") :
                        model == "large" ? $("#type").attr("value", "n1-standard-8") :
                            model == "medium" ? $("#type").attr("value", "n1-standard-4") :
                                model == "small" ? $("#type").attr("value", "n1-standard-2") :
                                    $("#type").attr("value", "n1-standard-1")
            }
        }
    });
});