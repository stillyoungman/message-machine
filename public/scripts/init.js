document.getElementById("send").addEventListener("click", function (event) {
    event.preventDefault()
});

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "700",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//set board size
setTimeout(()=>{
    let height = window.innerHeight - 200;
    let b = document.getElementById('board');
    b.setAttribute("style", `max-height:${height};`);
    b.classList.remove("invis");
},100);
