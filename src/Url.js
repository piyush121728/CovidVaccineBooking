const DevUrl = {
    searchByPin : "http://localhost:80/searchcentre",
    bookCentre: "http://localhost:80/bookcentre",
    adminCreateCentre: "http://localhost:80/admin/createcentre",
    fetchAllCentres: "http://localhost:80/admin/allcentres",
    deleteCentre: "http://localhost:80/admin/deletecentre",
    verifyAdmin: "http://localhost:80/admin/verifyadmin"
}

const ProdUrl = {
    searchByPin: "https://vaccinateme-server.onrender.com/searchcentre",
    bookCentre: "https://vaccinateme-server.onrender.com/bookcentre",
    adminCreateCentre: "https://vaccinateme-server.onrender.com/admin/createcentre",
    fetchAllCentres: "https://vaccinateme-server.onrender.com/admin/allcentres",
    deleteCentre: "https://vaccinateme-server.onrender.com/admin/deletecentre",
    verifyAdmin: "https://vaccinateme-server.onrender.com/admin/verifyadmin"
}

const Url = process.env.NODE_ENV === 'production' ? ProdUrl : DevUrl;

export default Url;