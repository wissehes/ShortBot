function deleteLink(code) {
    console.log(code)
    axios.delete(`/api/${code}`)
        .then(() => location.reload())
        .catch(console.log)
}

document.getElementById("linkForm").onsubmit = form => {
    form.preventDefault()
    const FD = new FormData(document.getElementById("linkForm"))
    var dataToSend = {
        longUrl: FD.get("longUrl")
    }
    if (FD.get("urlCode")) {
        if (FD.get("urlCode").length < 5) {
            return M.toast({ html: "Custom short URL can't be shorter than 5 characters" })
        } else if (FD.get("urlCode").length > 15) {
            return M.toast({ html: "Custom short URL can't be longer than 15 characters" })
        } else {
            dataToSend.urlCode = FD.get("urlCode")
        }
    }
    axios.post("/api/create", dataToSend).then(() => location.reload())
}