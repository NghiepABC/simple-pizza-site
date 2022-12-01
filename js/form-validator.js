function validation(formId){
    var userBookingForm = $(formId);
    if(userBookingForm){
        var formRules = {
            required: function required(value){
                return value ? undefined : "This field is required";
            },
            email: function email(value){
                let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
                return isValidEmail ? undefined : "Your email is not valid";
            }
        }

        var formInputTags = userBookingForm.querySelectorAll(".input__tag");
        var inputTagRules = {};

        function toGetInputParentBlock(e){
            return e.target.closest(".userBooking__block"); 
        }

        function handleOnInput(e){
            e.target.classList.remove("invalid");
        }

        function handleOnBlur(e){
            let inputTagName = this.getAttribute("name");
            let inputValue = this.value;
            let parentNode = toGetInputParentBlock(e);
            let inputMessError = parentNode.querySelector(".input__errorMsg");
            for(rule of inputTagRules[inputTagName]){
                if(formRules[rule](inputValue)){
                    this.classList.add("invalid");
                    inputMessError.innerText = formRules[rule](inputValue);
                    break;
                }
            }
        }

        formInputTags.forEach(function(formInputTag){
            let inputTagName = formInputTag.getAttribute("name");
            if(inputTagName !== "user__selection"){
                inputTagRules[inputTagName] = formInputTag.getAttribute("rules").split("|");
                formInputTag.onblur = handleOnBlur;
                formInputTag.oninput = handleOnInput;
            }
        })
    }
}

validation("#userBooking-form");
validation("#footerForm");