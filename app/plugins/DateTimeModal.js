const ModalPicker = require("nativescript-modal-datetimepicker")
  .ModalDatetimepicker;

const picker = new ModalPicker();

// Pick Date
exports.selectDate = function() {
  picker
    .pickDate({
      title: "Select Your Birthday",
      theme: "light",
      maxDate: new Date()
    })
    .then(result => {
      // Note the month is 1-12 (unlike js which is 0-11)
      console.log(
        "Date is: " + result.day + "-" + result.month + "-" + result.year
      );
      return result;
    })
    .catch(error => {
      console.log("Error: " + error);
    });
};

// Pick Time
exports.selectTime = function() {
  picker
    .pickTime()
    .then(result => {
      console.log("Time is: " + result.hour + ":" + result.minute);
    })
    .catch(error => {
      console.log("Error: " + error);
    });
};
