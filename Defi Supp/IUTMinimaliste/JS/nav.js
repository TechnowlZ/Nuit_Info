document.addEventListener('keydown', (event) => {

    var code = event.code;
    console.log("key", code);
    if (code == 'Enter') {
        window.open('../HTML/index1.html',"_self");
    }
    if (code == "Backspace") {
        window.history.back();
    }

});