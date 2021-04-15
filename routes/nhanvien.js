const fs = require('fs');

module.exports = {
    getAddNhanvien: (req, res) => {
        res.render('add-player.ejs', {
            title: 'Welcome to Manage Web'
            ,message: ''
        });
    },

    postAddNhanvien: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let Name = req.body.Name;
        let Position = req.body.Position;
        let Email = req.body.Email;
        let Date = req.body.Date;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = Name + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `nhanvien` WHERE Name = '" + Name + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Name already exists';
                res.render('add-player.ejs', {
                    message,
                    title: 'Welcome to Manage Web'
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `nhanvien` (Name, Image, Position, Email, Dob) VALUES ('" +
                            Name + "', '" + image_name + "', '" + Position + "', '" + Email + "', '" + Date + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: 'Welcome to Manage Web'
                    });
                }
            }
        });
    },

    getEditNhanvien: (req, res) => {
        let employeeId = req.params.id;
        let query = "SELECT * FROM `nhanvien` WHERE id = '" + employeeId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: 'Edit  Employee'
                ,player: result[0]
                ,message: ''
            });
        });
    },

    postEditNhanvien: (req, res) => {
        let employeeId = req.params.id;
        let Name = req.body.Name;
        let Position = req.body.Position;
        let Email = req.body.Email;
        let Date = req.body.Date;

        let query = "UPDATE `nhanvien` SET `Name` = '" + Name + "', `Position` = '" + Position + "', `Email` = '" + Email + "', `Dob` = '" + Date + "' WHERE `nhanvien`.`id` = '" + employeeId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    
    getDeleteNhanvien: (req, res) => {
        let employeeId = req.params.id;
        let getImageQuery = 'SELECT Image from `nhanvien` WHERE id = "' + employeeId + '"';
        let deleteUserQuery = 'DELETE FROM nhanvien WHERE id = "' + employeeId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let Image = result[0].Image;

            fs.unlink(`public/assets/img/${Image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};
