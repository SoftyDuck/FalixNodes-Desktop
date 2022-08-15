setTimeout(() => {
    var styles = `
    body {
        background: transparent !important;
    }
    ::-webkit-scrollbar {
        width: 0 !important;
    }

    .navbar-top, #top > div > div > div:nth-child(2), #top > div > div > div:nth-child(3), footer {
        display: none !important;
    }

    .card {
        background: rgba(46, 48, 49, 0.5) !important;
        border: 2px rgba(52, 52, 52, 0.961) solid !important;
        border-radius: 10px !important;
    }
    .bg-light {
        background: transparent !important;
    }
    h5 {
        font-size: 18px !important;
        font-weight: bold !important;
    }
    button {
        box-shadow: none !important;
        border: none !important;
        font-size: 14px !important;
    }
    .form-control, .form-select {
        background: rgb(0 0 0 / 25%) !important;
        border: 1px rgba(52, 52, 52, 0.961) solid !important;
        border-radius: 4px !important;
    }
    .content {
        margin-top: 32px !important;
    }

    .divider-content-center {
        border-radius: 50px !important;
        color: white !important;
    }
    `

    var styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
}, 0500);