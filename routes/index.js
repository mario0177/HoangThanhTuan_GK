module.exports = {
    getHomePage: (req, res) => {
        const search = req.query.search;
        let query = "";

        if (search) {
            query = "SELECT * FROM `nhanvien` where name like '%" + search + "%' ORDER BY id ASC";
        } else {
            query = "SELECT * FROM `nhanvien` ORDER BY id ASC";
        }

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            } else {
                res.render('index.ejs', {
                    title: 'Welcome to Manage Web',
                    nhanviens: result
                });
            }
        });
    },
};